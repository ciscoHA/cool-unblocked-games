function insertHTMLIntoBody() {
    // Create a new div element
    const div = document.createElement('div');
    div.className = 'fixed-background'; // Set the class directly

    // Append the new div to the body
    document.body.appendChild(div);
}

insertHTMLIntoBody();

// bad method :) - checks whether primary colour has a value, if it doesnt then it resets all customisation values.
function setDefaultValuesIfPrimaryColorMissing() {
    const customisationData = localStorage.getItem('customisation');

    if (
        !customisationData || 
        customisationData.split('\n')[1] === '' || 
        customisationData === [
            '/background.png',
            '#111e2c',
            '#58aafc',
            '100'
        ].join('\n')
    ) {
        const defaultCustomisation = [
            '',  // Default preset GO TO LINE 432
            '',          
            '',         
            '',
            'default'   

        ].join('\n');

        localStorage.setItem('customisation', defaultCustomisation);
    }
}

// Call the function
setDefaultValuesIfPrimaryColorMissing();


// Call the functions in order
setDefaultValuesIfPrimaryColorMissing();

//document.addEventListener('DOMContentLoaded', function() {
//  setDefaultLocalStorageValues();
//});
function loadIframe() {
    // If gameName is "none", stop the function from executing

    var iframeSrc = 'https://coolubg.github.io/coolubg-list/'; // VERY IMPORTANT THIS IS WHERE THE URL FOR THE GAMES IS KEPT SO IF YOU WANT TO USE YOUR OWN WEBSITE THEN CHANGE THIS LINK!
    // var gameVariable = getGameVariable();
    iframeSrc += gameName;

    var iframe = document.getElementById('game-iframe');

    // Directly include the Ruffle script URL
    var ruffleScript = document.createElement('script');
    ruffleScript.src = "https://unpkg.com/@ruffle-rs/ruffle";
    document.head.appendChild(ruffleScript);

    iframe.src = iframeSrc; // Set iframe source directly
}


document.addEventListener('DOMContentLoaded', function () {

    // Set server button if it hasnt been set already
    //  if (!localStorage.getItem("selectedButton")) {
    //   localStorage.setItem("selectedButton", "primary"); //Default to primary - Line 310
    // }

    // Fetch and insert navbar and title bar
    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            var tempContainer = document.createElement('div');
            tempContainer.innerHTML = data;

            var navbarContainer = document.getElementById('navbar-container');
            navbarContainer.innerHTML = tempContainer.innerHTML;

            // Set a high z-index directly
            navbarContainer.style.position = 'relative'; // Or 'absolute' / 'fixed' based on your layout
            navbarContainer.style.zIndex = '9999'; // Or a high enough value to ensure it's on top

            attachNavbarListeners();
            updateButtonState(localStorage.getItem('selectedButton'));
        })
        .catch(error => console.error('Error loading navbar:', error));

       // Check if the titlebar container exists
const titlebarContainer = document.getElementById('titlebar-container');
if (titlebarContainer) {
    // Proceed to fetch and inject the title bar content
    fetch('/titlebar.html')
        .then(response => response.text())
        .then(data => {
            // Clear any existing content
            titlebarContainer.innerHTML = '';
            // Insert new content
            titlebarContainer.innerHTML = data;

            // Set the title if `titleText` is defined
            const titleElement = document.getElementById('title-text');
            if (titleElement && typeof titleText !== 'undefined') {
                titleElement.textContent = titleText;
            }

            // If game is an SWF then display download button else hide
            const downloadButton = titlebarContainer.querySelector('.download-button');
            if (downloadButton) {
                if (typeof gameName !== 'undefined' && gameName.endsWith('.swf')) {
                    downloadButton.style.visibility = 'visible';
                    downloadButton.style.display = 'block';
                } else {
                    downloadButton.style.visibility = 'hidden';
                    downloadButton.style.display = 'none';
                }
            }

            // Load the iframe after title bar content is loaded
            loadIframe();
        })
        .catch(error => console.error('Error loading title bar:', error));
} else {
    console.warn('Titlebar container not found..');
}


});
// Function to load an external script dynamically with a Promise
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });
}


function attachNavbarListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    function searchPages(query) {
        searchResults.innerHTML = '';
        if (query === "") {
            searchResults.style.display = 'none';
            return;
        }

        const normalizedQuery = query
            .replace(/&/g, ' and ')
            .toLowerCase()
            .trim();

        const queryWords = normalizedQuery.split(/\s+/);

        // Filter by name and category
        const filteredPages = pagesData.filter(pageData => {
            const normalizedPageName = pageData.name
                .replace(/-/g, ' ')
                .replace(/&/g, ' and ')
                .toLowerCase();

            let normalizedCategory = pageData.category
                ? pageData.category.toLowerCase().trim()
                : 'none';

            if (normalizedCategory === "none") {
                normalizedCategory = "";
            }

            const normalizedCategoryWords = normalizedCategory.split(/\s+/);

            const nameMatches = queryWords.every(word => normalizedPageName.includes(word));
            const categoryMatches = queryWords.every(word =>
                normalizedCategoryWords.some(categoryWord =>
                    categoryWord.startsWith(word) && word.length >= categoryWord.length / 2)
            );

            return nameMatches || categoryMatches;
        });

        const sortedPages = filteredPages.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            const queryLower = normalizedQuery.toLowerCase();

            const aStartsWith = nameA.startsWith(queryLower);
            const bStartsWith = nameB.startsWith(queryLower);

            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;

            const aOccurrences = (nameA.match(new RegExp(queryLower, "g")) || []).length;
            const bOccurrences = (nameB.match(new RegExp(queryLower, "g")) || []).length;

            if (aOccurrences > bOccurrences) return -1;
            if (aOccurrences < bOccurrences) return 1;

            const aFirstOccurrence = nameA.indexOf(queryLower);
            const bFirstOccurrence = nameB.indexOf(queryLower);

            if (aFirstOccurrence < bFirstOccurrence) return -1;
            if (aFirstOccurrence > bFirstOccurrence) return 1;

            return nameA.localeCompare(nameB);
        });

        if (sortedPages.length === 0) {
            searchResults.innerHTML = '<p style="margin: 0; font-size: 14px; color: var(--primary-color);">No results found</p>';
            searchResults.style.display = 'block';
        } else {
            for (let i = 0; i < sortedPages.length; i++) {
                const pageData = sortedPages[i];
                const item = document.createElement('div');
                item.classList.add('searchItem');
                if (i > 0) {
                    item.style.borderTop = '1px solid var(--primary-color)';
                    item.style.marginTop = '5px';
                }
                const anchor = document.createElement('a');
                anchor.href = `/games/${pageData.name}.html`;
                anchor.style = `
                            text-decoration: none;
                            font-family: "M Plus Rounded 1c", sans-serif;
                            font-weight: bold;
                            color: var(--primary-color);
                            font-size: 16px;
                            display: flex;
                            align-items: flex-start;
                 `;
                anchor.addEventListener('mouseover', function () {
                    anchor.style.textDecoration = 'underline';
                });
                anchor.addEventListener('mouseout', function () {
                    anchor.style.textDecoration = 'none';
                });
                const image = document.createElement('img');
                image.src = `/images/games/${pageData.name}.png`;
                image.alt = pageData.formatted_Name;
                image.style.width = '6vw';
                image.style.height = 'auto';
                image.style.borderRadius = '3px';
                image.style.marginRight = '4px';
                const text = document.createElement('p');
                text.style = `
                            margin: 0;
                            max-width: calc(100% - 80px);
                            font-weight: bold;
                            color: var(--primary-color);
                            font-size: 14px;
                            text-align: left;
                            white-space: normal;
                            word-wrap: break-word;
`;
                text.textContent = pageData.formatted_Name;
                anchor.appendChild(image);
                anchor.appendChild(text);
                item.appendChild(anchor);
                searchResults.appendChild(item);
            }

            searchResults.scrollTop = 0;
            searchResults.style.maxHeight = '300px';
            searchResults.style.overflowY = 'auto';
            searchResults.style.display = 'block';
        }
    }

    searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        searchPages(query);
    });

    document.addEventListener('click', function (event) {
        if (event.target !== searchInput) {
            searchInput.value = '';
            searchResults.style.display = 'none';
        }
    });
}


// const primaryButton = document.getElementById('primary-button');
// const backupButton = document.getElementById('backup-button');

// if (primaryButton && backupButton) {
//     primaryButton.addEventListener('click', function () {
//         setIframeSrc(getPrimarySrc(), 'primary');
//     });

//     backupButton.addEventListener('click', function () {
//         setIframeSrc(getBackupSrc(), 'backup');
//     });
// }




//function setIframeSrc(url, button) {
//var iframe = document.getElementById('game-iframe');

//if (iframe) {
//if (confirm('Are you sure you want to change the game? Any unsaved progress may be lost.')) {
//  localStorage.setItem('selectedButton', button);

// Set the source of the iframe
//    iframe.src = url + getGameVariable(); // Uses gameText
// updateButtonState(button); // Commented out as button state is not needed
//  }
//} else {
//  localStorage.setItem('selectedButton', button);
//    location.reload();
//  }
//}


// function getPrimarySrc() {
//     return 'https://coolubg.github.io/coolubg-list/';
// }

// function getBackupSrc() {
//     return 'https://coolubg2.github.io/coolubg-list/';
// }

// function getGameVariable() {
//     return typeof gameName !== 'undefined' ? gameName : '';
// }

// function updateButtonState(selectedButton) {
//     var primaryButton = document.getElementById('primary-button');
//     var backupButton = document.getElementById('backup-button');

//     primaryButton.classList.remove('selected');
//     backupButton.classList.remove('selected');

//     if (selectedButton === 'primary') {
//         primaryButton.classList.add('selected');
//     } else {
//         backupButton.classList.add('selected');
//     }

//     primaryButton.textContent = "Primary" + (selectedButton === 'primary' ? "" : "");
//     backupButton.textContent = "Secondary" + (selectedButton === 'backup' ? "" : "");
// }

document.addEventListener('DOMContentLoaded', function () {
    const customisation = localStorage.getItem('customisation');
    const fixedBackgroundImg = document.querySelector('.fixed-background');

    if (customisation) {
        // Split the string into lines
        const lines = customisation.split('\n');

        // Ensure there are at least 4 lines
        if (lines.length >= 4) {
            const backgroundRes = parseInt(lines[3].trim());
            if (!isNaN(backgroundRes)) {
                fixedBackgroundImg.style.backgroundSize = `${backgroundRes}vw auto`;
            }
        }
    }
});

function downloadSWF() {
    // Find the iframe with the ID 'game-iframe'
    const gameIframe = document.getElementById('game-iframe');
    
    // Check if the iframe exists
    if (gameIframe && gameIframe.src) {
        // Open the iframe's src in a new tab
        window.open(gameIframe.src, '_blank');
    }
}

function fullscreenFunction1() {
    var iframe = document.getElementById('game-iframe');
    if (!iframe) return;

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}
function fullscreenFunction2() {
    var gameElement = document.getElementById('game-iframe');
    if (!gameElement) return;

    var gameSrc = gameElement.src;
    const currentUrl = window.location.href;

    // Extract the relevant portion of the URL
    let pageName;
    if (currentUrl.includes("#")) {
        // Get everything after the hash (#)
        pageName = currentUrl.split("#").pop();
    } else {
        // Get everything between "/games/" and ".html"
        const match = currentUrl.match(/\/games\/(.*?)\.html/);
        pageName = match ? match[1] : "unknown";
    }

    // Dynamically fetch the contents of playtime.js
    fetch('/js/playtime.js')
        .then(response => response.text())
        .then(playtimeScript => {

            // Dynamically fetch the contents of pages.js
            fetch('/pages.js').then(response => response.text()).then(PagesScript => {

                // Dynamically fetch the contents of hash-sync-ruffleplayer if pageName is "ruffle-swf-player"
                const hashSyncScriptPromise = pageName === "ruffle-swf-player"
                    ? fetch('/js/hash-sync-ruffleplayer').then(response => response.text())
                    : Promise.resolve('');

                hashSyncScriptPromise.then(hashSyncScript => {
                    // Create the HTML content as a Blob
                    var htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${titleText} - Fullscreen</title>
    <style>
        html, body { height: 100%; margin: 0; overflow: hidden; }
        #iframe { width: 100vw; height: 100vh; border: none; }
    </style>
    <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    <script>var playtimeName = "${pageName}";</script>
    <script>${PagesScript}</script>
</head>
<body>
    ${gameElement.tagName === 'IFRAME'
                            ? `<iframe id="iframe" src="${gameSrc}"></iframe>`
                            : `<embed id="iframe" src="${gameSrc}" type="application/x-shockwave-flash">`
                        }
    <script>${playtimeScript}</script>
    <script>${hashSyncScript}</script>
</body>
</html>
                    `;

                    // Create a Blob and URL for the HTML content
                    var blob = new Blob([htmlContent], { type: 'text/html' });
                    var blobUrl = URL.createObjectURL(blob);

                    // Open the new tab with the Blob URL
                    var newTab = window.open(blobUrl, '_blank');

                    if (!newTab) {
                        alert('Failed to open new tab. Please check your browser settings.');
                    }

                    // Clean up Blob URL
                    newTab.addEventListener('unload', () => {
                        URL.revokeObjectURL(blobUrl);
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error fetching playtime.js or pages.js:', error);
        });
}

function applyStoredSettings() {
    // Preset values
    const presetBackgroundImage = '/background.png';
    const presetPrimaryColor = '#111E2C';
    const presetSecondaryColor = '#58AAFC';
    const presetBackgroundRes = '100';

    // Get the "customisation" data from localStorage
    const customisationData = localStorage.getItem('customisation');

    if (customisationData) {
        // Split the data by newline to get each individual setting
        const lines = customisationData.split('\n');

        // Check if customisation matches the default
        const isDefault = lines.length === 5 &&
        lines[0] === '' &&
        lines[1] === '' &&
        lines[2] === '' &&
        lines[3] === '' &&
        lines[4] === 'default';
        // Set values based on whether "default" is detected
        let backgroundImage, primaryColor, secondaryColor, backgroundRes;
        if (isDefault) {
            backgroundImage = `url('${presetBackgroundImage}')`;
            primaryColor = presetPrimaryColor;
            secondaryColor = presetSecondaryColor;
            backgroundRes = presetBackgroundRes;
        } else {
            // Extract customization values if no "default" line is found
            [backgroundImage, primaryColor, secondaryColor, backgroundRes] = lines;

            if (backgroundImage) {
                backgroundImage = `url('${backgroundImage}')`;
            }
        }

        const fixedBackgroundImg = document.querySelector('.fixed-background');

        // Apply the background image if it exists
        if (fixedBackgroundImg && backgroundImage) {
            fixedBackgroundImg.style.backgroundImage = backgroundImage;
        }

        // Apply the primary color if it exists
        if (primaryColor) {
            document.documentElement.style.setProperty('--primary-color', primaryColor);
        }

        // Apply the secondary color if it exists
        if (secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        }

        // Apply the background resolution if it exists
        if (backgroundRes && fixedBackgroundImg) {
            fixedBackgroundImg.style.backgroundSize = `${backgroundRes}vw auto`;
        }

        // Add the brightness checking and background color update here
        // Function to calculate the brightness of a hex code
        function hexToHSV(hex) {
            // Extract RGB components from the hex code
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;

            // Find the maximum and minimum values of RGB components
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);

            // V (Value) is the brightness in HSV
            const v = max;

            return v;
        }

        function getBrightness(hex) {
            return hexToHSV(hex); // V component directly represents brightness
        }

        // Use the secondaryColor (which is a hex code) for brightness calculation
        const hexCode = secondaryColor; // Replace 'secondaryColor' with the actual color variable

        // Check if the hex code exists and is valid
        if (hexCode && /^#[0-9A-F]{6}$/i.test(hexCode)) {
            const brightness = getBrightness(hexCode);

            // Determine background color based on brightness
            const backgroundColor = brightness < 0.5 ? '#ffffff' : '#0c0c0c';
            const backgroundColorText = brightness < 0.5 ? primaryColor : secondaryColor; // Text that goes over a Dark Background (description)

            // Apply the background color using CSS variable
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--background-color-text', backgroundColorText);
        }
    }
}

window.addEventListener('load', applyStoredSettings);

document.getElementById('settings-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const backgroundImageValue = document.getElementById('background-image').value;
    const primaryColorValue = document.getElementById('primary-color').value;
    const secondaryColorValue = document.getElementById('background-color').value;
    const backgroundResValue = document.getElementById('background-res').value;

    // Combine the values into a single string, with each value separated by a newline
    const customisationData = `${backgroundImageValue}\n${primaryColorValue}\n${secondaryColorValue}\n${backgroundResValue}`;

    // Store the combined string in localStorage under the key "customisation"
    localStorage.setItem('customisation', customisationData);

    // Reload the page to apply changes
    location.reload();
});
