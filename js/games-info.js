document.addEventListener('DOMContentLoaded', function () {
    const DB_NAME = "PlaytimeDB";
    const STORE_NAME = "playtimeLogs";
    const DB_VERSION = 1;

    const currentPageURL = window.location.pathname;
    const pageName = currentPageURL.split('/games/')[1]?.split('.html')[0];

    if (pageName) {
        const pageEntry = pagesData.find(page => page.name === pageName);

        const name = pageEntry?.formatted_Name || pageName;
        const category = pageEntry?.category || "None";
        const date = pageEntry?.date || null;
        const formattedDate = date ? formatDate(date) : "Unknown";
        const releaseDate = pageEntry?.release_Date || null;
        const formattedRelease = releaseDate ? formatDate(releaseDate) : "Unknown";
        const updateDate = pageEntry?.update_Date || null;
        const formattedUpdate = updateDate ? formatDate(updateDate) : null;

        const lastUpdateLine = formattedUpdate ? `Last Update: ${formattedUpdate}<br>` : '';

        // Check if the playtime display should be shown
        const playtimeShow = localStorage.getItem('playtime-log');
        const showPlaytime = playtimeShow && playtimeShow.includes("playtime-show");

        let descriptionHTML = `
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
                    Release Date: ${formattedRelease}<br>
        `;

        // If playtime should be shown, add it directly into the same paragraph
        if (showPlaytime) {
            descriptionHTML += `
                <br>Total Playtime: <span id="totalPlaytime">Loading...</span><br>
                <span id="lastPlayedLine">Last Played: Loading...</span>
            `;
        }

        descriptionHTML += `
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

        document.getElementById('description-container').innerHTML = descriptionHTML;

        // Initialize IndexedDB and fetch playtime stats if needed
        if (showPlaytime) {
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
                        updatePlaytimeDisplay({ minutesPlayed: "Never Played", lastPlayed: "Unknown" });
                    }
                };

                request.onerror = function(event) {
                    console.error("Error fetching playtime data:", event.target.error);
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
                document.getElementById('totalPlaytime').textContent = playtimeStats.minutesPlayed;
                const lastPlayedLine = document.getElementById('lastPlayedLine');
                lastPlayedLine.textContent = `Last Played: ${playtimeStats.lastPlayed}`;
                if (playtimeStats.minutesPlayed === "Never Played") {
                    lastPlayedLine.style.display = 'none';
                } else {
                    lastPlayedLine.style.display = 'block';
                }
            }

            function formatPlaytime(minutes) {
                if (minutes === 1) return "1 minute";
                if (minutes <= 120) return `${minutes} minutes`;

                const hours = (minutes / 60).toFixed(1);
                return `${hours} hours`;
            }
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
    } else {
        console.error('Could not extract page name from URL');
    }
});
