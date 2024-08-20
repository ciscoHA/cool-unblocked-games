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

// Example usage:
insertHTMLIntoBody();

function setDefaultLocalStorageValues() {
    if (!localStorage.getItem('background-image')) {
        localStorage.setItem('background-image', '/background.png');
    }
    if (!localStorage.getItem('primary-color')) {
        localStorage.setItem('primary-color', '#11E2C');
    }
    if (!localStorage.getItem('secondary-color')) {
        localStorage.setItem('secondary-color', '#58AAFC');
    }
    if (!localStorage.getItem('background-res')) {
        localStorage.setItem('background-res', '1280');
    }
    if (!localStorage.getItem('selectedButton')) {
        localStorage.setItem('selectedButton', 'primary'); // Set default button to primary
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setDefaultLocalStorageValues();
});

document.addEventListener('DOMContentLoaded', function() {
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

    fetch('/titlebar.html')
        .then(response => response.text())
        .then(data => {
            var tempContainer = document.createElement('div');
            tempContainer.innerHTML = data;

            var titlebarContainer = document.getElementById('titlebar-container');
            titlebarContainer.innerHTML = ''; // Clear existing content
            titlebarContainer.innerHTML = tempContainer.innerHTML; // Insert new content

            if (typeof titleText !== 'undefined') {
                document.getElementById('title-text').textContent = titleText;
            }
            if (typeof author !== 'undefined' && typeof authorLink !== 'undefined') {
                document.getElementById('author-text').innerHTML = '<a href="' + authorLink + '">' + author + '</a>';
            }

            var titleBar = document.getElementById('dynamic-title-bar');
            var iframe = document.getElementById('game-iframe');
            var iframeWidth = iframe.offsetWidth - 40;
            titleBar.style.width = iframeWidth + 'px';
        })
        .catch(error => console.error('Error loading title bar:', error));

    loadIframe();
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

// Load pages.js and then initialize search functionality
loadScript('pages.js')
    .then(() => {
        // Ensure the pages array is defined before attaching the search functionality
        if (typeof pages !== 'undefined' && Array.isArray(pages)) {
            attachNavbarListeners();
        } else {
            console.error('pages array is not defined or not an array.');
        }
    })
    .catch(error => console.error(error));

function attachNavbarListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    function searchPages(query) {
        searchResults.innerHTML = '';
        if (query === "") {
            searchResults.style.display = 'none';
            return;
        }

        const filteredPages = pages.filter(page =>
            page.replace(/-/g, ' ').replace(/&/g, ' and ').toLowerCase().includes(query.replace(/&/g, ' and ').toLowerCase())
        );

        const displayCount = Math.min(filteredPages.length, 5);

        if (displayCount === 0) {
            searchResults.innerHTML = '<p style="margin: 0; font-size: 14px; color: var(--primary-color);">No results found</p>';
            searchResults.style.display = 'block';
        } else {
            for (let i = 0; i < displayCount; i++) {
                const page = filteredPages[i];
                const item = document.createElement('div');
                item.classList.add('searchItem');
                if (i > 0) {
                    item.style.borderTop = '1px solid var(--primary-color)';
                    item.style.marginTop = '5px';
                }
                const anchor = document.createElement('a');
                anchor.href = `/games/${page}.html`;
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
                image.src = `/images/games/${page}.png`;
                image.alt = `${page}`;
                image.style.width = '70px';
                image.style.height = '39.38px';
                image.style.borderRadius = '3px';
                image.style.marginRight = '10px';
                const text = document.createElement('p');
                const formattedPageName = capitalizeFirstLetter(page.replace(/-/g, ' ').replace(/&/g, ' and '));
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
                searchResults.style.display = 'block';
            }
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
        primaryButton.addEventListener('click', function() {
            setIframeSrc(getPrimarySrc(), 'primary');
        });

        backupButton.addEventListener('click', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const backgroundRes = localStorage.getItem('background-res');
    const fixedBackgroundImg = document.querySelector('.fixed-background');

    if (backgroundRes && !isNaN(parseInt(backgroundRes))) {
        fixedBackgroundImg.style.backgroundSize = `${backgroundRes}px auto`;
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
    var newTab = window.open('about:blank');

    if (newTab) {
        var newGameElement;
        if (gameElement.tagName === 'IFRAME') {
            newGameElement = document.createElement('iframe');
            newGameElement.src = gameSrc;
            newGameElement.style.width = '100%';
            newGameElement.style.height = '100%';
            newGameElement.style.border = 'none';
        } else {
            newGameElement = document.createElement('embed');
            newGameElement.src = gameSrc;
            newGameElement.style.width = '100%';
            newGameElement.style.height = '100%';
            newGameElement.type = 'application/x-shockwave-flash'; // Set the type attribute for Flash content
        }

        newTab.document.body.appendChild(newGameElement);
        newTab.document.body.style.margin = '0';

        // Create and append the Ruffle script element
        var ruffleScript = newTab.document.createElement('script');
        ruffleScript.src = 'https://unpkg.com/@ruffle-rs/ruffle';
        newTab.document.head.appendChild(ruffleScript);
    }
}

function applyStoredSettings() {
    const backgroundImage = localStorage.getItem('background-image');
    const primaryColor = localStorage.getItem('primary-color');
    const secondaryColor = localStorage.getItem('secondary-color');
    const fixedBackgroundImg = document.querySelector('.fixed-background');

    if (fixedBackgroundImg && backgroundImage) {
        fixedBackgroundImg.style.backgroundImage = `url('${backgroundImage}')`;
    }
    if (primaryColor) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
    }
    if (secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.querySelector('.container').style.backgroundColor = secondaryColor;
    }
}

window.addEventListener('load', applyStoredSettings);

document.getElementById('settings-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const backgroundImageValue = document.getElementById('background-image').value;
    const primaryColorValue = document.getElementById('primary-color').value;
    const secondaryColorValue = document.getElementById('background-color').value;

    localStorage.setItem('background-image', backgroundImageValue);
    localStorage.setItem('primary-color', primaryColorValue);
    localStorage.setItem('secondary-color', secondaryColorValue);

    location.reload();
});


