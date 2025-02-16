// INDEX DB NAMES ARE STORED IN INDEX.HTML below highlight/hover functions
// Function to open the IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            // Create an object store for playtime logs if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "gameId" });
            }
        };

        request.onsuccess = function (event) {
            resolve(event.target.result); // Resolve with the database
        };

        request.onerror = function (event) {
            reject("Error opening IndexedDB: " + event.target.errorCode); // Reject if there's an error
        };
    });
}

// Function to get playtime logs for a specific game
async function getPlaytimeLogs(gameId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(gameId);

        request.onsuccess = function (event) {
            const result = event.target.result;
            if (result) {
                resolve(result.logs); // Resolve with the logs of the game
            } else {
                resolve([]); // Return empty array if no logs exist for the game
            }
        };

        request.onerror = function (event) {
            reject("Error fetching playtime logs: " + event.target.errorCode); // Reject if error occurs
        };
    });
}

// Function to update or add playtime logs for a specific game
async function updatePlaytimeLogs(gameId, logEntry) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(gameId);

        request.onsuccess = function (event) {
            const result = event.target.result;

            if (result) {
                // If game exists, add the new log entry
                result.logs.push(logEntry);
                store.put(result); // Update the game log entry
            } else {
                // If game doesn't exist, create a new entry
                store.add({ gameId: gameId, logs: [logEntry] });
            }

            resolve("Log entry added/updated successfully");
        };

        request.onerror = function (event) {
            reject("Error updating playtime logs: " + event.target.errorCode); // Reject if error occurs
        };
    });
}

// Playtime Calculation Function
async function calculatePlaytime(gameId) {
    try {
        // Get playtime logs for the game from IndexedDB
        const logs = await getPlaytimeLogs(gameId);

        if (logs.length === 0) {
            return "Never Played"; // If no logs exist, return "Never Played"
        }

        const gamePlaytime = logs.length;

        if (gamePlaytime === 1) {
            return "1 minute"; // If only one log entry, return 1 minute
        }

        // Convert minutes to hours if over 120 minutes
        if (gamePlaytime > 120) {
            let hours = gamePlaytime / 60;
            hours = hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1); // Remove decimal if .0
            return `${hours} hours`;
        }

        return `${gamePlaytime} minutes`; // Otherwise, return minutes
    } catch (error) {
        console.error("Error calculating playtime:", error);
        return "Never Played"; // Return "Never Played" if there's an error
    }
}
