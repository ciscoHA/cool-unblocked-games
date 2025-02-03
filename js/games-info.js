document.addEventListener('DOMContentLoaded', function () {
    const DB_NAME = "PlaytimeDB";
    const STORE_NAME = "playtimeLogs";
    const DB_VERSION = 1;

    const currentPageURL = window.location.pathname;
    const hash = window.location.hash.slice(1); // Extract the part after the '#'
    const pageName = hash || currentPageURL.split('/games/')[1]?.split('.html')[0]; // Use hash if present, else fallback to URL extraction

    if (pageName) {
        const pageEntry = pagesData.find(page => page.name === pageName);

        const name = pageEntry?.formatted_Name || pageName; // Use formatted_Name if available, else fallback to pageName
        const category = pageEntry?.category || "None"; // Use category if available, else default to "None"
        const date = pageEntry?.date || null;
        const formattedDate = date ? formatDate(date) : "Unknown";
        const releaseDate = pageEntry?.release_Date || null;
        const formattedRelease = releaseDate ? formatDate(releaseDate) : "Unknown";
        const updateDate = pageEntry?.update_Date || null;
        const formattedUpdate = updateDate ? formatDate(updateDate) : null;

        const lastUpdateLine = formattedUpdate ? `Last Update: ${formattedUpdate}<br>` : '';

        const playtimeStats = calculatePlaytimeStats(pageName);

        document.getElementById('description-container').innerHTML = `
            <div class="description description-left">
                <div class="description-head">
                    <h2>Credits and Info</h2>
                </div>
                <p>
                    ${name}<br>
                    By <a href="${authorLink}" target="_blank">${author}</a><br>
                    Tags: ${category}<br><br>
                    Date Added: ${formattedDate}<br>
                    ${lastUpdateLine}
                    Release Date: ${formattedRelease}<br><br>
                    Total Playtime: ${playtimeStats.minutesPlayed}<br>
                    <span id="lastPlayedLine" style="${playtimeStats.minutesPlayed === 'Never Played' ? 'display: none;' : ''}">Last Played: ${playtimeStats.lastPlayed}<br></span>
                </p>
            </div>
            
            <div class="description description-right">
                <div class="description-head">
                    <h2>Description and Overview</h2>
                </div>
                <p>
                    ${description}<br><br>
                    ${releaseDate.match(/-/g)?.length === 2 ? `${name} was released on the ${formattedRelease} created by ${author}` : ''}
                </p>
            </div>

            <div class="description description-bottom">
                <div class="description-head">
                    <h2>Related Games</h2>
                </div>
                <div id="relatedGamesContainer"></div>
            </div>
        `;

        // Initialize IndexedDB and fetch playtime stats
        let db;
        const openRequest = indexedDB.open(DB_NAME, DB_VERSION);

        openRequest.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "gameId" });
            }
        };

        openRequest.onsuccess = function(event) {
            db = event.target.result;
            fetchPlaytimeStats(pageName); // Fetch stats once the DB is open
        };

        openRequest.onerror = function(event) {
            console.error("Error opening IndexedDB:", event.target.error);
        };

        function fetchPlaytimeStats(pageName) {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(pageName);

            request.onsuccess = function(event) {
                const playtimeData = event.target.result;

                if (playtimeData && playtimeData.logs) {
                    const playtimeStats = calculatePlaytimeStatsFromLogs(playtimeData.logs);
                    updatePlaytimeDisplay(playtimeStats);
                } else {
                    updatePlaytimeDisplay({ minutesPlayed: "Never Played", firstPlayed: "Unknown", lastPlayed: "Unknown" });
                }
            };

            request.onerror = function(event) {
                console.error("Error fetching playtime data:", event.target.error);
            };
        }

        function calculatePlaytimeStats(pageName) {
            // This function should return default values if there's no playtime data
            return { 
                minutesPlayed: "0 minutes", 
                firstPlayed: "Unknown", 
                lastPlayed: "Unknown" 
            };
        }

        function calculatePlaytimeStatsFromLogs(logs) {
            const minutesPlayed = logs.length;
            const firstPlayed = logs[0];
            const lastPlayed = logs[logs.length - 1];

            return {
                minutesPlayed: formatPlaytime(minutesPlayed),
                firstPlayed: firstPlayed,
                lastPlayed: lastPlayed
            };
        }

        function updatePlaytimeDisplay(playtimeStats) {
            document.querySelector('.description-left p').innerHTML = `
                ${name}<br>
                By <a href="${authorLink}" target="_blank">${author}</a><br>
                Tags: ${category}<br><br>
                Date Added: ${formattedDate}<br>
                ${lastUpdateLine}
                Release Date: ${formattedRelease}<br><br>
                Total Playtime: ${playtimeStats.minutesPlayed}<br>
                <span id="lastPlayedLine" style="${playtimeStats.minutesPlayed === 'Never Played' ? 'display: none;' : ''}">Last Played: ${playtimeStats.lastPlayed}<br></span>
            `;
        }

        function formatDate(date) {
            if (!date || date.trim() === '') return 'Unknown';
            if (!date.includes('-')) return date;
            if (date.split('-').length === 2) {
                const [month, year] = date.split('-');
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'
                ];
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            }
            const [day, month, year] = date.split('-');
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'
            ];
            return `${getDayWithSuffix(parseInt(day))} ${monthNames[parseInt(month) - 1]} ${year}`;
        }

        function getDayWithSuffix(day) {
            if (day > 3 && day < 21) return day + 'th';
            switch (day % 10) {
                case 1: return day + 'st';
                case 2: return day + 'nd';
                case 3: return day + 'rd';
                default: return day + 'th';
            }
        }

        function formatPlaytime(minutes) {
            if (minutes === 1) return "1 minute";
            if (minutes <= 120) return `${minutes} minutes`;

            const hours = (minutes / 60).toFixed(1);
            return `${hours} hours`;
        }

    } else {
        console.error('Could not extract page name from URL');
    }
});
