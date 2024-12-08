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

    // Check if the "customisation" data is missing or the primary color is missing/empty
    if (!customisationData || customisationData.split('\n')[1] === '') {
        const defaultCustomisation = [
            '/background.png',  // Default background image
            '#111E2C',          // Default "primary" text color
            '#58AAFC',          // Default secondary/theme/accent color
            '100'              // Default background resolution
        ].join('\n');

        // Store the default values in the "customisation" key
        localStorage.setItem('customisation', defaultCustomisation);
    }
}

// Call the functions in order
setDefaultValuesIfPrimaryColorMissing();

//document.addEventListener('DOMContentLoaded', function() {
//  setDefaultLocalStorageValues();
//});

function loadIframe() {
    var iframeSrc = 'https://coolubg.github.io/coolubg-list/'; // VERY IMPORTANT THIS IS WHERE THE URL FOR THE GAMES IS KEPT SO IF YOU WANT TO USE YOUR OWN WEBSITE THEN CHANGE THIS LINK!
  //  var gameVariable = getGameVariable();
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
     // const iframe = document.getElementById('game-iframe');
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
                anchor.style.textDecoration = 'none';
                anchor.style.fontFamily = '"M Plus Rounded 1c", sans-serif'; // Set font here
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
                image.alt = pageData.formatted_Name;
                image.style.width = '6vw';
                image.style.height = 'auto';
                image.style.borderRadius = '3px';
                image.style.marginRight = '8px';
                const text = document.createElement('p');
                text.style.margin = '0';
                text.style.maxWidth = 'calc(100% - 80px)'; // Allow more room for text
                text.style.overflow = 'hidden';
                text.style.whiteSpace = 'nowrap'; // Ensure text stays on one line
                text.style.fontWeight = 'bold';
                text.style.color = 'var(--primary-color)';
                text.style.fontSize = '14px';
                text.style.textAlign = 'left';
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
    <title>${titleText} - Fullscreen</title>
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
            fixedBackgroundImg.style.backgroundSize = `${backgroundRes}vw auto`;
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
