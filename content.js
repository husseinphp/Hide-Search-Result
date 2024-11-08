// Function to create a button with specified properties
function createButton(text, color, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.width = '100%'; // Make buttons take the full width of the menu
    button.style.margin = '5px 0'; // Space between buttons
    button.style.padding = '10px';
    button.style.backgroundColor = color;
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', onClick);
    return button;
}

// Create the dropdown menu button
const dropdownButton = document.createElement('button');
dropdownButton.innerText = ' Search Options';
dropdownButton.style.position = 'fixed';
dropdownButton.style.top = '10px';
dropdownButton.style.right = '10px';
dropdownButton.style.zIndex = '1000';
dropdownButton.style.padding = '10px';
dropdownButton.style.backgroundColor = '#3498DB'; // Main button color
dropdownButton.style.color = 'white';
dropdownButton.style.border = 'none';
dropdownButton.style.borderRadius = '5px';
dropdownButton.style.cursor = 'pointer';
document.body.appendChild(dropdownButton);

// Create the dropdown menu
const dropdownMenu = document.createElement('div');
dropdownMenu.style.position = 'fixed';
dropdownMenu.style.top = '50px';
dropdownMenu.style.right = '10px';
dropdownMenu.style.zIndex = '1000';
dropdownMenu.style.backgroundColor = 'white';
dropdownMenu.style.border = '1px solid #ddd';
dropdownMenu.style.borderRadius = '5px';
dropdownMenu.style.padding = '10px';
dropdownMenu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
dropdownMenu.style.width = '11%';
dropdownMenu.style.display = 'none'; // Hide menu initially
document.body.appendChild(dropdownMenu);

// Toggle menu display
dropdownButton.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

// Create buttons and add them to the dropdown menu
dropdownMenu.appendChild(createButton('Reset Excluded Results', '#E74C3C', () => {
    chrome.storage.sync.set({ excludedUrls: [] }, () => {
        alert('Excluded results have been reset!');
    });
}));
dropdownMenu.appendChild(createButton('Add inurl to Search', '#2ECC71', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const inurlQuery = `inurl:? || inurl:& ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", inurlQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search Login/Register', '#3498DB', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const loginQuery = `(intext:Login OR intext:Register OR intext:"Create Account") ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", loginQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search Signin/Register URLs', '#F39C12', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const signinQuery = `(inurl:/signin OR inurl:/login OR inurl:/register) ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", signinQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search PHP Files', '#8E44AD', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const phpQuery = `filetype:php ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", phpQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search PDF Files', '#D35400', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const pdfQuery = `ext:pdf ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", pdfQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search Invoices/Receipts', '#C0392B', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const invoiceReceiptQuery = `"invoice" "receipt" ext:pdf ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", invoiceReceiptQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search Before 2015', '#1ABC9C', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const beforeQuery = `before:2015-01-01 ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", beforeQuery);
    window.location.href = url.toString();
}));
dropdownMenu.appendChild(createButton('Search PDF with Login Info', '#9B59B6', () => {
    const query = new URL(window.location.href).searchParams.get("q");
    const loginInfoQuery = `(login: OR api OR password: OR pass:) ext:pdf ${query}`;
    const url = new URL(window.location.href);
    url.searchParams.set("q", loginInfoQuery);
    window.location.href = url.toString();
}));

// Add "0xHussein" button
dropdownMenu.appendChild(createButton('0xHussein', '#4CAF50', () => {
    window.open('https://x.com/0xHussein', '_blank'); // Open link in new window
}));

// Add "Clear Search" button
dropdownMenu.appendChild(createButton('Clear Search', '#FF5733', () => {
    const currentUrl = new URL(window.location.href);
    const query = currentUrl.searchParams.get("q");
    
    // Extract original domain from query
    const match = query.match(/site:([^\s]+)/);
    const originalDomain = match ? match[1] : '';

    if (originalDomain) {
        // Create a new query with the original domain only
        const clearQuery = `site:${originalDomain}`;
        currentUrl.searchParams.set("q", clearQuery); // Update search query
        window.location.href = currentUrl.toString(); // Redirect to new URL
    } else {
        alert("No valid domain found in the search query!");
    }
}));
