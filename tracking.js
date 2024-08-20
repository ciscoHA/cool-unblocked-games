// Function to load an external script dynamically
function loadScript(url) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}

// Load pages.js
loadScript('pages.js');

// Function to track the recently visited page
function trackPage() {
    var currentPage = window.location.href;
    var currentPageWithoutFragment = currentPage.split("#")[0];
    var visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];

    // Check if the current page is under /games/
    if (currentPageWithoutFragment.includes("/games/")) {
        // Remove any previous occurrences of the current page
        visitedPages = visitedPages.filter(
            (page) => page.split("#")[0] !== currentPageWithoutFragment
        );

        // Check if the current page is not already in the list before adding it
        if (!visitedPages.includes(currentPageWithoutFragment)) {
            // Add the current page to the list
            visitedPages.unshift(currentPageWithoutFragment);
        }
    }

    // Remove duplicates while keeping all 4 visited pages
    var uniqueVisitedPages = [...new Set(visitedPages)];

    // Keep only the first 4 visited pages
    uniqueVisitedPages = uniqueVisitedPages.slice(0, 4);

    // Save the updated list back to localStorage
    localStorage.setItem("visitedPages", JSON.stringify(uniqueVisitedPages));

    // Display the recently visited pages
    displayVisitedPages();
}

// Function to capitalize the first letter of each word in a string
function capitalizeFirstLetter(str) {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });
}

// Function to generate a random game image filename
function getRandomGameImage() {
    return pages[Math.floor(Math.random() * pages.length)];
}

// Function to display the recently visited pages
function displayVisitedPages() {
    var displayElement = document.getElementById("recently-played");
    var visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];

    // Fill any missing slots with "missing"
    while (visitedPages.length < 4) {
        visitedPages.push("missing");
    }

    // Create the HTML for each visited page
    var html = "";
    visitedPages.forEach(function (page, index) {
        var editedName = page.match(/\/games\/([^\/]+)\.html/); // Extract game name from URL
        editedName = editedName ? editedName[1].replace(/-/g, " ") : "missing"; // Replace hyphens with spaces

        // If the game is missing, set edited name to "Featured"
        if (editedName === "missing") {
            editedName = "Featured";
            var imgFileName = getRandomGameImage(); // Get a random game image
        } else {
            editedName = capitalizeFirstLetter(editedName); // Capitalize first letter of each word
            var imgFileName = editedName.replace(/ /g, "-").toLowerCase(); // Convert name to lowercase and replace spaces with hyphens
        }

        // Remove file extension from imgFileName
        imgFileName = imgFileName.replace('.html', '');

        // Generate anchor href based on imgFileName
        var hrefValue = `/games/${imgFileName}.html`;

        // Create HTML for each list item
        html += "<li>";
        html += '<div class="suggest-game">';
        html += `<a href="${hrefValue}">`;
        html +=
            '<div style="position: absolute; background-color: rgba(0, 0, 0, 0); z-index: 3; margin-left: 0.4rem; margin-top: -0.4rem; width: 15.45rem; height: 12rem;" onmouseover="highlightImage2(\'suggest-imgC' +
            (index + 1) +
            '\', \'suggest-text' +
            (index + 1) +
            '\')" onmouseout="removeHighlight2(\'suggest-imgC' +
            (index + 1) +
            '\', \'suggest-text' +
            (index + 1) +
            "')\"></div>";
        html +=
            '<img style="outline: 3px solid #fc5858; border: 1px solid #fc5858" id="suggest-imgC' +
            (index + 1) +
            `" src="/images/games/${imgFileName}.png" alt="Recently Played" />`;
        html +=
            '<div id="fade-wrapper" style="z-index: -1; position: absolute; width: 16vw; height: 7vh; margin-top: -1.4rem; margin-left: 0.45rem; overflow: hidden; opacity: 0;">';
        html += '<div class="box-shadow"></div>';
        html += "</div>";
        html += "</a>";
        html += `<a href="${hrefValue}">`;
        html += '<span id="suggest-text' + (index + 1) + '">' + editedName + "</span>";
        html += "</a>";
        html += "</div>";
        html += "</li>";
    });

    // Update the content of the 'recently-played' list
    displayElement.innerHTML =
        '<ul id="recently-played" class="game-list" style="color: transparent; list-style-type: none; padding: 0">' +
        html +
        "</ul>";
}

// Function to clear recently visited pages
function clearRecentlyVisited() {
    localStorage.removeItem("visitedPages");
    displayVisitedPages(); // Display the updated list (empty after clearing)
}

// Call the trackPage function when the page loads
window.onload = function () {
    trackPage();
    generatePageList();

    sortList();

    // Add event listener to the clear button
    document.getElementById("clear-button").addEventListener("click", clearRecentlyVisited);
};
