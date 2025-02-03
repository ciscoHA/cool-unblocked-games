const DB_NAME = "PlaytimeDB";
const STORE_NAME = "playtimeLogs";
const DB_VERSION = 1;

// Open (or create) IndexedDB database
function openDB() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "gameId" });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

// Log playtime in IndexedDB
async function logPlaytime() {
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

    let db = await openDB();
    let transaction = db.transaction(STORE_NAME, "readwrite");
    let store = transaction.objectStore(STORE_NAME);

    let request = store.get(pageName);
    
    request.onsuccess = () => {
        let entry = request.result || { gameId: pageName, logs: [] };
        entry.logs.push(timestamp);
        store.put(entry);
    };

    // Also log the non-hashed version if different
    if (pageName !== nonHashedPageName) {
        let nonHashedRequest = store.get(nonHashedPageName);
        nonHashedRequest.onsuccess = () => {
            let entry = nonHashedRequest.result || { gameId: nonHashedPageName, logs: [] };
            entry.logs.push(timestamp);
            store.put(entry);
        };
    }
}

// Start logging at minute start
function startLoggingAtMinuteStart() {
    const currentPageURL = window.location.pathname;
    const pageName = currentPageURL.split('/games/')[1]?.split('.html')[0];

    const pageEntry = pagesData.find(page => page.name === pageName);
    const category = pageEntry?.category || "";
    const isIdleCategory = category.toLowerCase().includes("idle");

    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    setTimeout(() => {
        logPlaytime();
        setInterval(() => {
            if (document.visibilityState === "visible" || isIdleCategory) {
                logPlaytime();
            }
        }, 60000);
    }, msUntilNextMinute);
}

// Start logging process
startLoggingAtMinuteStart();
