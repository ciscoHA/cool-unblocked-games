const PDB_NAME = "PlaytimeDB";
const PSTORE_NAME = "playtimeLogs";
const PDB_VERSION = 1;

// Open (or create) IndexedDB database
function PopenB() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(PDB_NAME, PDB_VERSION);

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            if (!db.objectStoreNames.contains(PSTORE_NAME)) {
                db.createObjectStore(PSTORE_NAME, { keyPath: "gameId" });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// Log playtime in IndexedDB
async function PlogPlaytime() {
    const currentUrl = window.location.href;
    let pageName, nonHashedPageName;
    
    if (currentUrl.includes("#")) {
        pageName = currentUrl.split("#").pop();
        nonHashedPageName = currentUrl.split("#")[0].match(/\/games\/(.*?)\.html/);
        nonHashedPageName = nonHashedPageName ? nonHashedPageName[1] : "unknown";
    } else if (currentUrl.includes("/games/")) {
        const match = currentUrl.match(/\/games\/(.*?)\.html/);
        pageName = match ? match[1] : "unknown";
        nonHashedPageName = pageName;
    } else {
        pageName = typeof playtimeName !== "undefined" ? playtimeName : "unknown";
        nonHashedPageName = pageName;
    }

    const now = new Date();
    const timestamp = now.toLocaleString("en-GB", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: false
    });

    let db = await PopenB();
    let transaction = db.transaction(PSTORE_NAME, "readwrite");
    let store = transaction.objectStore(PSTORE_NAME);

    let request = store.get(pageName);
    
    request.onsuccess = () => {
        let entry = request.result || { gameId: pageName, logs: [] };
        entry.logs.push(timestamp);
        let putRequest = store.put(entry);
        
        putRequest.onsuccess = () => {
            console.log(`Logged playtime for ${pageName}: ${timestamp}`);
        };
        putRequest.onerror = () => {
            console.error("Error saving entry:", putRequest.error);
        };
    };

    request.onerror = () => {
        console.error("Error fetching entry:", request.error);
    };

    // Also log the non-hashed version if different
    if (pageName !== nonHashedPageName) {
        let nonHashedRequest = store.get(nonHashedPageName);
        nonHashedRequest.onsuccess = () => {
            let entry = nonHashedRequest.result || { gameId: nonHashedPageName, logs: [] };
            entry.logs.push(timestamp);
            let nonHashedPutRequest = store.put(entry);
            
            nonHashedPutRequest.onsuccess = () => {
                console.log(`Logged playtime for ${nonHashedPageName}: ${timestamp}`);
            };
            nonHashedPutRequest.onerror = () => {
                console.error("Error saving non-hashed entry:", nonHashedPutRequest.error);
            };
        };

        nonHashedRequest.onerror = () => {
            console.error("Error fetching non-hashed entry:", nonHashedRequest.error);
        };
    }

    transaction.oncomplete = () => {
        console.log("Playtime Transaction completed successfully");
    };
}

// Start logging at minute start
function startLoggingAtMinuteStart() {
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    setTimeout(() => {
        PlogPlaytime(); // Log at the start of the next minute
        setInterval(() => {
            PlogPlaytime(); // Log every minute
        }, 60000);
    }, msUntilNextMinute);
}

// Start logging process
startLoggingAtMinuteStart();
