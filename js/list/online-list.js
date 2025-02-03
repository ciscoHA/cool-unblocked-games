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

        // If there are multiple entries, return the number of minutes
        return `${gamePlaytime} minutes`;
    } catch (error) {
        console.error("Error calculating playtime:", error);
        return "Never Played"; // Return "Never Played" if there's an error
    }
}

// Function to generate the online game list
async function generatePageListONLINE() {
    console.log("generatePageListMULTI is running...");

    // Get the container element for the game list
    const pageList = document.getElementById('pageListONLINE');
    if (!pageList) {
        console.error("Error: Element with ID 'pageListONLINE' not found!");
        return;
    }

    pageList.innerHTML = ""; // Clear previous content in the game list

    // Check if pagesData exists and is valid
    if (!Array.isArray(pagesData) || pagesData.length === 0) {
        console.error("Error: pagesData is empty or not defined!", pagesData);
        return;
    }

    // Filter online pages based on category and sort alphabetically by name
    const onlinePages = pagesData
        .filter(page => typeof page.category === "string" && page.category.includes("online"))
        .sort((a, b) => a.name.localeCompare(b.name));

    console.log("Filtered online Pages:", onlinePages);

    // If no online games, stop here
    if (onlinePages.length === 0) {
        console.warn("Warning: No online games found!");
        return;
    }

    // Loop through each online page
    for (let index = 0; index < onlinePages.length; index++) {
        const page = onlinePages[index];
        const formattedName = page.formatted_Name || page.name; // Use fallback if formatted_Name is missing

        // Calculate letter spacing adjustments based on name length
        let letterSpacing = "normal";
        if (formattedName.length > 20) {
            letterSpacing = formattedName.length > 24 
                ? `-${(formattedName.length - 20) * 0.02}rem`
                : `-${(formattedName.length - 20) * 0.014}rem`;
        }

        // Retrieve playtime for this game
        let playtimeText = "Loading...";
        try {
            playtimeText = await calculatePlaytime(page.name);
        } catch (error) {
            console.error("Error retrieving playtime for", page.name, error);
            playtimeText = "Error";
        }

        console.log(`Game: ${formattedName} | Playtime: ${playtimeText}`);

        // Create the list item
        if (!(localStorage.getItem('playtime-log') && localStorage.getItem('playtime-log').includes("playtime-hide"))) {
          const li = document.createElement('li');
          li.innerHTML = `
          <div class="suggest-game" 
              onmouseover="highlightImageP('suggest-imgPO${index + 1}', 'suggest-textPO${index + 1}')" 
              onmouseout="removeHighlightP('suggest-imgPO${index + 1}', 'suggest-textPO${index + 1}')">
              <a href="games/${page.name}.html">
                  <div class="suggest-text-back-container" style="position: absolute; margin: 0.6vh; width: 16.8vw; height: calc(20.3vw * 9 / 16); overflow: hidden; z-index: 2;">
                      <div class="suggest-text-back" style="position: absolute; width: 300%; height: 300%; left: -5vw; top: 0vw; background-color: black; opacity: 0;"></div>
                  </div>
                  <img id="suggest-imgPO${index + 1}" src="/images/games/${page.name}.png" alt="${page.name}" style="margin: 0.6vh; border-radius: 0.4vw; position: relative; height: auto;" />
                  <p id="suggest-textPO${index + 1}" style="letter-spacing: ${letterSpacing}; position: absolute; z-index: 999; left: 1.25vw; top: calc(100% - 4.75vw - 0.9rem); opacity: 0; text-align: left;">
                      <span style="display: block; margin-bottom: -0.5rem;">${formattedName}</span>
                      <span style="font-size: 0.95rem; margin: 0; padding: 0; color: #d9d9d9 !important; letter-spacing: normal; line-height: 1; display: inline-flex; align-items: center;">
                          <svg xmlns="http://www.w3.org/2000/svg" 
                               style="width: 1em !important; height: 1em !important; fill: currentColor !important; vertical-align: middle !important; margin-right: 0.15em !important; filter: drop-shadow(0px 0px 4px #000) drop-shadow(0px 0px 2px #000) drop-shadow(0px 0px 4px #000);" 
                               viewBox="0 -960 960 960">
                              <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
                          </svg>
                          ${playtimeText}
                      </span>
                  </p>
              </a>
          </div>
          `;
          pageList.appendChild(li);
      } else {
          const li = document.createElement('li');
          li.innerHTML = `
          <div class="suggest-game" 
              onmouseover="highlightImageP('suggest-imgPO${index + 1}', 'suggest-textPO${index + 1}')" 
              onmouseout="removeHighlightP('suggest-imgPO${index + 1}', 'suggest-textPO${index + 1}')">
              <a href="games/${page.name}.html">
                  <div class="suggest-text-back-container" style="position: absolute; margin: 0.6vh; width: 16.8vw; height: calc(20.3vw * 9 / 16); overflow: hidden; z-index: 2;">
                      <div class="suggest-text-back" style="position: absolute; width: 300%; height: 300%; left: -5vw; top: 0vw; background-color: black; opacity: 0;"></div>
                  </div>
                  <img id="suggest-imgPO${index + 1}" src="/images/games/${page.name}.png" alt="${page.name}" style="margin: 0.6vh; border-radius: 0.4vw; position: relative; height: auto;" />
                  <p id="suggest-textPO${index + 1}" style="letter-spacing: ${letterSpacing}; position: absolute; z-index: 999; left: 1.25vw; top: calc(100% - 4.75vw); opacity: 0; text-align: left;">
                      <span style="display: block; margin-bottom: -0.5rem;">${formattedName}</span>
                  </p>
              </a>
          </div>
          `;
          pageList.appendChild(li);
      }
      
    }
}
