function setDefaultLocalStorageValues() {
    if (!localStorage.getItem('background-image')) {
        localStorage.setItem('background-image', '/background.png');
    }
    if (!localStorage.getItem('primary-color')) {
        localStorage.setItem('primary-color', '#3c3c3c');
    }
    if (!localStorage.getItem('secondary-color')) {
        localStorage.setItem('secondary-color', '#58AAFC');
    }
    if (!localStorage.getItem('background-res')) {
        localStorage.setItem('background-res', '1280');
    }
    if (!localStorage.getItem('mode')) {
        localStorage.setItem('mode', 'dark'); // Set default mode to dark
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

            var titleImageElement = tempContainer.querySelector('#title-image');
            var mode = localStorage.getItem('mode');
            var titleImageSrc = mode === 'dark' ? '/title.png' : '/title-l.png';

            if (titleImageElement) {
                titleImageElement.src = titleImageSrc;
            }

            document.getElementById('navbar-container').innerHTML = tempContainer.innerHTML;
            attachNavbarListeners();
            updateButtonState(localStorage.getItem('selectedButton'));
        })
        .catch(error => console.error('Error loading navbar:', error));

    fetch('/titlebar.html')
        .then(response => response.text())
        .then(data => {
            var tempContainer = document.createElement('div');
            tempContainer.innerHTML = data;

            var mode = localStorage.getItem('mode');
            var fullscreen1Src = mode === 'dark' ? '/images/icons/fullscreen-1.png' : '/images/icons/fullscreen-1-l.png';
            var fullscreen2Src = mode === 'dark' ? '/images/icons/fullscreen-2.png' : '/images/icons/fullscreen-2-l.png';

            var fullscreenButton1 = tempContainer.querySelector('.fullscreen-button-1 img');
            var fullscreenButton2 = tempContainer.querySelector('.fullscreen-button-2 img');

            if (fullscreenButton1) {
                fullscreenButton1.src = fullscreen1Src;
            }

            if (fullscreenButton2) {
                fullscreenButton2.src = fullscreen2Src;
            }

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

function attachNavbarListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    var pages = [
        "1v1-lol",
        "2048",
        "a-dark-room",
        "among-us-online",
        "among-us-online-2",
        "appel-multiplayer",
        "appel",
        "awesome-tanks",
        "awesome-tanks-2",
        "bitlife",
        "bob-the-robber-2",
        "circloo",
        "cloud-platformer-fun",
        "cookie-clicker",
        "crossy-road",
        "cut-the-rope",
        "doom",
        "drift-boss",
        "drive-mad",
        "earn-to-die-2",
        "eggy-car",
        "fireboy&watergirl-2",
        "fireboy&watergirl-3",
        "fireboy&watergirl-4",
        "fnaf-2",
        "fnaf",
        "friday-night-funkin",
        "getaway-shootout",
        "jelly-truck",
        "johnny-upgrade",
        "merge-melon",
        "minecraftish-mmo",
        "mini-golf-online",
        "mini-golf-online-2",
        "moto-x3m-2",
        "moto-x3m-3",
        "moto-x3m-pool-party",
        "moto-x3m-spooky-land",
        "moto-x3m-winter",
        "moto-x3m",
        "neverball",
        "ovo",
        "paper-io-2",
        "plants-vs.-zombies-web-demo",
        "polytrack",
        "pong",
        "retro-bowl",
        "rooftop-snipers",
        "run-3",
        "slither.io-online",
        "slope",
        "snow-rider-3d",
        "stack",
        "stickman-hook",
        "subway-surfers",
        "tanuki-sunset",
        "temple-run-2",
        "tennis-physics",
        "the-final-earth-2",
        "tiny-fishing",
        "tomb-of-the-mask",
        "age-of-war-2",
        "age-of-war",
        "alien-hominid",
        "asteroids",
        "bad-piggies",
        // "bejeweled",
        // "blank",
        "bloons-td-2",
        "bloons-td-3",
        "bloons-td-4",
        "bloons-td",
        "bloons-tower-defense-5",
        "bloons",
        "bloxorz",
        "bob-the-robber",
        "breaking-the-bank",
        "btd4-exp",
        "duck-life-2",
        "duck-life-3",
        "duck-life-4",
        "duck-life",
        "escaping-the-prison",
        "fancy-snowboarding",
        "fireboy&watergirl",
        "fishy!",
        "fleeing-the-complex",
       // "gluey2",
        "gravitee-2",
        "gravitee",
        "gun-mayhem-2",
        "gun-mayhem",
        "infiltrating-the-airship",
        "jacksmith",
        "learn-to-fly-2",
       // "learn-to-fly-idle",
        "learn-to-fly",
        "light-bot",
        "line-rider",
        "n",
        "pacman",
        "papas-freezeria",
        "papas-pizzeria",
       // "qwop",
        "raft-wars",
        "run-2",
        "stealing-the-diamond",
        "super-mario-63",
        "super-smash-flash",
        "the-fancy-pants-adventures-remix",
        "the-fancy-pants-adventures-world-2",
        "the-fancy-pants-adventures-world-3",
        "the-fancy-pants-adventures",
        "the-worlds-hardest-game-2",
        "the-worlds-hardest-game",
        "unfair-mario",
        "vex-3",
        "n-gon",
        "basket-random",
        "hextris",
        "jstetris",
        "quake-3-arena-demo",
       // "raft-wars-remake",
        "there-is-no-game",
        "time-shooter-2",
        "time-shooter-3-swat",
        "abobos-big-adventure",
        "cactus-mccoy",
        "cactus-mccoy-2",
        "douchebag-life",
        "douchebag-workout-2",
        "floodrunner-4",
        "learn-to-fly-3",
        "papa-louie-2",
        "papa-louie-3",
        "papa-louie-when-pizzas-attack",
        "papas-cheeseria",
        "papas-scooperia",
        "portal-the-flash-version",
        "raft-wars-2",
        "the-impossible-quiz",
        "8-ball-pool"
        ];

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
                text.innerHTML = `${line1}
          ${line2}`;
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

    if (backgroundRes && !isNaN(parseInt(backgroundRes))) {
        document.body.style.backgroundSize = `${backgroundRes}px auto`;
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

    if (backgroundImage) {
        document.body.style.backgroundImage = `url('${backgroundImage}')`;
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
