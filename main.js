function insertIntoHead(content) {
    const head = document.head || document.getElementsByTagName('head')[0];

    // Create a range to parse the HTML content
    const range = document.createRange();
    range.selectNode(head);

    // Create a fragment to hold the parsed content
    const fragment = range.createContextualFragment(content);

    // Append the fragment to the head
    head.appendChild(fragment);
}

insertIntoHead('  <script src="/pages.js"></script>');

// Function to load an external script dynamically
function loadScript(url) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}

// Load pages.js
loadScript('pages.js');

function insertHTMLIntoBody() {
    // Create a new div element
    const div = document.createElement('div');
    div.className = 'fixed-background'; // Set the class directly

    // Append the new div to the body
    document.body.appendChild(div);
}

insertHTMLIntoBody();

//function setDefaultLocalStorageValues() {
//  if (!localStorage.getItem('background-image')) {
//     localStorage.setItem('background-image', '/background.png');
// }
// if (!localStorage.getItem('primary-color')) {
//    localStorage.setItem('primary-color', '#11E2C');
// }
// if (!localStorage.getItem('secondary-color')) {
//     localStorage.setItem('secondary-color', '#58AAFC');
// }
// if (!localStorage.getItem('background-res')) {
//   localStorage.setItem('background-res', '1280');
//}
//if (!localStorage.getItem('selectedButton')) {
//  localStorage.setItem('selectedButton', 'primary'); // Set default button to primary
//}
//}

// bad method :) - checks whether primary colour has a value, if it doesnt then it resets all customisation values.
function setDefaultValuesIfPrimaryColorMissing() {
    const customisationData = localStorage.getItem('customisation');

    // Check if the "customisation" data is missing or the primary color is missing/empty
    if (!customisationData || customisationData.split('\n')[1] === '') {
        const defaultCustomisation = [
            '/background.png',  // Default background image
            '#111E2C',          // Default primary color
            '#58AAFC',          // Default secondary color
            '1280'              // Default background resolution
        ].join('\n');

        // Store the default values in the "customisation" key
        localStorage.setItem('customisation', defaultCustomisation);
    }
}
// IF NEEDED TO REPLACE THEME SUCH AS SEASONAL UPDATE!
function checkAndUpdateCustomisationValues() {
    const customisationData = localStorage.getItem('customisation');

    // Define the expected default values
    const expectedValues = [
        '/background.png',  // Default background image
        '#111E2C',          // Default primary color
        '#58AAFC',          // Default secondary color
        '1280'              // Default background resolution
    ];

    // Check if customisationData exists and split into an array
    if (customisationData) {
        const currentValues = customisationData.split('\n');

        // Check if current values match the expected values
        if (currentValues.length >= 4 &&
            currentValues[0] === expectedValues[0] &&
            currentValues[1] === expectedValues[1] &&
            currentValues[2] === expectedValues[2] &&
            currentValues[3] === expectedValues[3]) {
            
            // Update to new values
            const newCustomisation = [ // NEW METHOD COMING SOON? THAT STORES THEMES IN GLOBAL JS AND MAKES EVERYTHING WAY EASIER
                'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Jack_O_Lanterns.jpg/800px-Jack_O_Lanterns.jpg?20121027173654',  // background image
                '#141414',              // New primary color
                '#f3670c',              // New secondary color
                '1920'                  // New background resolution
            ].join('\n');

            // Store the new values in the "customisation" key
            localStorage.setItem('customisation', newCustomisation);
        }
    }
}

// Call the functions in order
setDefaultValuesIfPrimaryColorMissing();
checkAndUpdateCustomisationValues();


//document.addEventListener('DOMContentLoaded', function() {
//  setDefaultLocalStorageValues();
//});

document.addEventListener('DOMContentLoaded', function () {
    // Set server button if it hasnt been set already
    if (!localStorage.getItem("selectedButton")) {
        localStorage.setItem("selectedButton", "primary"); //Default to primary - Line 310
    }

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

  // Fetch and update the title bar content
  fetch('/titlebar.html')
    .then(response => response.text())
    .then(data => {
      const titlebarContainer = document.getElementById('titlebar-container');
      titlebarContainer.innerHTML = ''; // Clear existing content
      titlebarContainer.innerHTML = data; // Insert new content
  
      // Set title and author if defined
      if (typeof titleText !== 'undefined') {
        document.getElementById('title-text').textContent = titleText;
      }
      if (typeof author !== 'undefined' && typeof authorLink !== 'undefined') {
        document.getElementById('author-text').innerHTML = `<a href="${authorLink}">${author}</a>`;
      }
  
      // Start the polling mechanism to update the title bar width for up to 5 seconds
      const iframe = document.getElementById('game-iframe');
      const titleBar = document.getElementById('dynamic-title-bar');
      titleBar.style.width = `${800 - 40}px`; // Adjust width with 40px padding

      loadIframe(); // Load iframe after title bar content is loaded
    })
    .catch(error => console.error('Error loading title bar:', error));
  
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

// Load pages-long.js and then initialize search functionality
//loadScript('pages-long.js')
   // .then(() => {
        // Ensure the pagesData array is defined before attaching the search functionality
    //    if (typeof pagesData !== 'undefined' && Array.isArray(pagesData)) {
    //        attachNavbarListeners();
     //   } else {
     //       console.error('pagesData array is not defined or not an array.');
     //   }
   // })
   // .catch(error => console.error(error));

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

        const queryWords = normalizedQuery.split(/\s+/);  // Split the query into words

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
                normalizedCategory = ""; // Ignore 'none' categories in search
            }

            const normalizedCategoryWords = normalizedCategory.split(/\s+/);  // Split category into words

            // Check if all query words match either the name or any of the category words
            const nameMatches = queryWords.every(word => normalizedPageName.includes(word));
            const categoryMatches = queryWords.every(word => 
                normalizedCategoryWords.some(categoryWord => 
                    categoryWord.startsWith(word) && word.length >= categoryWord.length / 2)
            );

            return nameMatches || categoryMatches;
        });

        // Sort the filtered results based on the priorities
        const sortedPages = filteredPages.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            const queryLower = normalizedQuery.toLowerCase();

            // Priority 1: Sort by whether the name starts with the query
            const aStartsWith = nameA.startsWith(queryLower);
            const bStartsWith = nameB.startsWith(queryLower);

            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;

            // Priority 2: Sort by the number of occurrences of the query in the name
            const aOccurrences = (nameA.match(new RegExp(queryLower, "g")) || []).length;
            const bOccurrences = (nameB.match(new RegExp(queryLower, "g")) || []).length;

            if (aOccurrences > bOccurrences) return -1;
            if (aOccurrences < bOccurrences) return 1;

            // Priority 3: Sort by the earliest occurrence of the query
            const aFirstOccurrence = nameA.indexOf(queryLower);
            const bFirstOccurrence = nameB.indexOf(queryLower);

            if (aFirstOccurrence < bFirstOccurrence) return -1;
            if (aFirstOccurrence > bFirstOccurrence) return 1;

            // Priority 4: Alphabetical order as a final tiebreaker
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
                anchor.style.textDecoration = 'none';
                anchor.style.fontFamily = "sans-serif";
                anchor.style.fontWeight = "bold";
                anchor.style.color = 'var(--primary-color)';
                anchor.style.fontSize = '16px';
                anchor.style.display = 'flex';
                anchor.style.alignItems = 'center';
                anchor.addEventListener('mouseover', function () {
                    anchor.style.textDecoration = 'underline';
                });
                anchor.addEventListener('mouseout', function () {
                    anchor.style.textDecoration = 'none';
                });
                const image = document.createElement('img');
                image.src = `/images/games/${pageData.name}.png`;
                image.alt = `${pageData.name}`;
                image.style.width = '70px';
                image.style.height = '39.38px';
                image.style.borderRadius = '3px';
                image.style.marginRight = '10px';
                const text = document.createElement('p');
                const formattedPageName = capitalizeFirstLetter(pageData.name.replace(/-/g, ' ').replace(/&/g, ' and '));
                let line1 = '';
                let line2 = '';
                const words = formattedPageName.split(' ');
                for (const word of words) {
                    if (line1.length === 0) {
                        if (word.length > 18) {
                            line1 += word.substr(0, 15) + '... ';
                            line2 += word.substr(15) + ' ';
                        } else {
                            line1 += word + ' ';
                        }
                    } else if ((line1 + word).length < 18) {
                        line1 += word + ' ';
                    } else {
                        line2 += word + ' ';
                    }
                }
                text.style.margin = '0';
                text.style.maxWidth = 'calc(100% - 80px)';
                text.style.overflow = 'hidden';
                text.style.textOverflow = 'ellipsis';
                text.style.whiteSpace = 'nowrap';
                text.style.fontWeight = 'bold';
                text.style.color = 'var(--primary-color)';
                text.style.fontSize = '14px';
                text.style.textAlign = 'left';
                text.innerHTML = `${line1} ${line2}`;
                anchor.appendChild(image);
                anchor.appendChild(text);
                item.appendChild(anchor);
                searchResults.appendChild(item);
            }

            // Reset scroll to the top whenever a new search is triggered
            searchResults.scrollTop = 0;

            // Set the max-height for scrolling, allow more items but with scroll
            searchResults.style.maxHeight = '300px';  // Set max height for 5 items or so
            searchResults.style.overflowY = 'auto';   // Enable scrolling for more than 5 results
            searchResults.style.display = 'block';
        }
    }

    function capitalizeFirstLetter(string) {
        return string.replace(/\b\w/g, letter => letter.toUpperCase());
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

    const primaryButton = document.getElementById('primary-button');
    const backupButton = document.getElementById('backup-button');

    if (primaryButton && backupButton) {
        primaryButton.addEventListener('click', function () {
            setIframeSrc(getPrimarySrc(), 'primary');
        });

        backupButton.addEventListener('click', function () {
            setIframeSrc(getBackupSrc(), 'backup');
        });
    }
}


function loadIframe() {
    var selectedButton = localStorage.getItem('selectedButton') || 'primary';
    var iframeSrc = selectedButton === 'primary' ? getPrimarySrc() : getBackupSrc();
    var gameVariable = getGameVariable();
    iframeSrc += gameVariable;

    var iframe = document.getElementById('game-iframe');

    // Directly include the Ruffle script URL
    var ruffleScript = document.createElement('script');
    ruffleScript.src = "https://unpkg.com/@ruffle-rs/ruffle";

    // Attach the script to the DOM and set the source
    document.head.appendChild(ruffleScript);

    // Set the source of the iframe
    iframe.src = iframeSrc;
    updateButtonState(selectedButton);
}

function setIframeSrc(url, button) {
    var iframe = document.getElementById('game-iframe');

    if (iframe) {
        if (confirm('Are you sure you want to change the game? Any unsaved progress may be lost.')) {
            localStorage.setItem('selectedButton', button);

            // Set the source of the iframe
            iframe.src = url + getGameVariable(); // Uses gameText
            updateButtonState(button);
        }
    } else {
        localStorage.setItem('selectedButton', button);
        location.reload();
    }
}


function getPrimarySrc() {
    return 'https://coolubg.github.io/coolubg-list/';
}

function getBackupSrc() {
    return 'https://coolubg2.github.io/coolubg-list/';
}

function getGameVariable() {
    return typeof gameName !== 'undefined' ? gameName : '';
}

function updateButtonState(selectedButton) {
    var primaryButton = document.getElementById('primary-button');
    var backupButton = document.getElementById('backup-button');

    primaryButton.classList.remove('selected');
    backupButton.classList.remove('selected');

    if (selectedButton === 'primary') {
        primaryButton.classList.add('selected');
    } else {
        backupButton.classList.add('selected');
    }

    primaryButton.textContent = "Primary" + (selectedButton === 'primary' ? "" : "");
    backupButton.textContent = "Secondary" + (selectedButton === 'backup' ? "" : "");
}

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
                fixedBackgroundImg.style.backgroundSize = `${backgroundRes}px auto`;
            }
        }
    }
});


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

    // Create the HTML content as a Blob
    var htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Fullscreen Game</title>
    <style>
        html, body { height: 100%; margin: 0; overflow: hidden; }
        #iframe { width: 100vw; height: 100vh; border: none; }
    </style>
    <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.documentElement.requestFullscreen();
        });
    </script>
</head>
<body>
    ${gameElement.tagName === 'IFRAME'
        ? `<iframe id="iframe" src="${gameSrc}"></iframe>`
        : `<embed id="iframe" src="${gameSrc}" type="application/x-shockwave-flash">`
    }
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
}

function applyStoredSettings() {
    // Get the "customisation" data from localStorage
    const customisationData = localStorage.getItem('customisation');

    if (customisationData) {
        // Split the data by newline to get each individual setting
        const [backgroundImage, primaryColor, secondaryColor, backgroundRes] = customisationData.split('\n');
        const fixedBackgroundImg = document.querySelector('.fixed-background');

        // Apply the background image if it exists
        if (fixedBackgroundImg && backgroundImage) {
            fixedBackgroundImg.style.backgroundImage = `url('${backgroundImage}')`;
        }

        // Apply the primary color if it exists
        if (primaryColor) {
            document.documentElement.style.setProperty('--primary-color', primaryColor);
        }

        // Apply the secondary color if it exists
        if (secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', secondaryColor);
            document.querySelector('.container').style.backgroundColor = secondaryColor;
        }

        // Apply the background resolution if it exists
        if (backgroundRes) {
            fixedBackgroundImg.style.backgroundSize = `${backgroundRes}px auto`;
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
