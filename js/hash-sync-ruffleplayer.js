const iframe = document.getElementById('game-iframe');

// Function to extract the hash from iframe URL and update the main page hash
function syncIframeHashWithMainPage() {
    try {
        // Get the iframe's internal location (URL)
        const iframeUrl = iframe.contentWindow.location.href;

        // Extract the part after the # (the hash fragment)
        const iframeHash = iframeUrl.split('#')[1] || ''; // Default to empty if there's no hash

        // If there is a hash in the iframe URL, update the main page's URL hash
        if (iframeHash) {
            window.location.hash = iframeHash;
            console.log(`Main page URL updated to: ${window.location.href}`);
        } else {
            // If no hash found in iframe URL, remove the hash from the main page URL entirely
            if (window.location.hash) {
                const urlWithoutHash = window.location.href.split('#')[0];  // Remove everything after #
                window.history.replaceState({}, document.title, urlWithoutHash);  // Update the URL without the hash
                console.log('Removed hash from main page URL');
            }
            console.log('No hash found in iframe URL and main page URL updated');
        }
    } catch (error) {
        console.log('Error accessing iframe URL:', error);
    }
}

// Function to start syncing on the 50th second of every minute
function startSyncingAt50thSecond() {
    const now = new Date();
    const seconds = now.getSeconds();

    // Calculate the delay until the next 50th second
    const delay = ((50 - seconds + 60) % 60) * 1000;

    setTimeout(() => {
        syncIframeHashWithMainPage(); // Run once at the 50th second
        setInterval(syncIframeHashWithMainPage, 60000); // Run every 60 seconds afterward
    }, delay);
}

// Start the process
startSyncingAt50thSecond();