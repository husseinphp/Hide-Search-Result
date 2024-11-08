chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "hideLink",
        title: "Hide 📥",
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "hideLink") {
        const urlToExclude = new URL(info.linkUrl).hostname;

        chrome.storage.sync.get("excludedUrls", (data) => {
            let excludedUrls = data.excludedUrls || [];

            // Check if the result is already excluded
            if (!excludedUrls.includes(urlToExclude)) {
                excludedUrls.push(urlToExclude);
            }

            // Remove duplicate links
            excludedUrls = [...new Set(excludedUrls)];

            // Update storage with excluded links
            chrome.storage.sync.set({ excludedUrls: excludedUrls }, () => {
                chrome.tabs.get(tab.id, (currentTab) => {
                    const url = new URL(currentTab.url);

                    if (url.searchParams.has("q")) {
                        let query = url.searchParams.get("q");

                        // Extract the site from the search query
                        const siteMatch = query.match(/site:([^\s]+)/);
                        const searchSite = siteMatch ? siteMatch[1] : ''; // If not found, it will be empty

                        // Ensure site:searchSite is added if it exists
                        if (searchSite && !query.includes(`site:${searchSite}`)) {
                            query = `site:${searchSite} ${query}`;
                        }

                        // Add all excluded links to the query without duplication
                        excludedUrls.forEach(excludedUrl => {
                            if (!query.includes(`-site:${excludedUrl}`)) {
                                query += ` -site:${excludedUrl}`;
                            }
                        });

                        // Update the search query
                        url.searchParams.set("q", query.trim()); // Use trim to remove excess spaces
                        chrome.tabs.update(tab.id, { url: url.toString() });
                    }
                });
            });
        });
    }
});

// Use onUpdated to monitor search pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes("google.com/search?q=")) {
        // Do not reset the excluded links list when a new search page loads
    }
});
