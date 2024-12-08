
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

// Function to format and capitalize the first letter of each word in a string
function formatAndCapitalize(str) {
    return str
        .toLowerCase()
        .replace(/\b\w/g, function (char) {
            return char.toUpperCase(); // Capitalize first letter of each word
        });
}

    // Function to generate a random game image filename based on pagesData
    function getRandomGameImage() {
        // Assuming `pagesData` is defined in pages.js
        var randomPage = pagesData[Math.floor(Math.random() * pagesData.length)];
        return randomPage.name.toLowerCase().replace(/ /g, "-"); // Convert name to lowercase and replace spaces with hyphens
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
        // Function to display the recently visited pages

    // Create the HTML for each visited page
    var html = "";
    // Assuming `pagesData` is already loaded from pages.js
visitedPages.forEach(function (page, index) {
    var editedName = page.match(/\/games\/([^\/]+)\.html/); // Extract game name from URL
    editedName = editedName ? editedName[1].replace(/-/g, " ") : "missing"; // Replace hyphens with spaces

    // Generate the display name with spaces around '&'
    var displayName = editedName.replace(/&/g, ' & ');
    displayName = formatAndCapitalize(displayName);

    // If the game is missing, set display name to "Featured" and get a random game image
    if (displayName === "Missing") {
        displayName = "Featured";
        var imgFileName = getRandomGameImage(); // Get a random game image
    } else {
        // Convert display name to lowercase and replace spaces with hyphens for image filename
        var imgFileName = displayName.replace(/ /g, "-").toLowerCase();
    }

    // Match imgFileName with `pagesData.name` and retrieve `formatted_Name`
    let formattedName = "Unknown"; // Default value in case no match is found
    pagesData.forEach((data) => {
        if (data.name === imgFileName) {
            formattedName = data.formatted_Name;
        }
    });

    // Check if the file is an image or HTML file
    var isImageOrHtmlFile = imgFileName.endsWith(".png") || imgFileName.endsWith(".html");

    // Generate the edited name with '-&-' for non-image/HTML files
    if (!isImageOrHtmlFile) {
        imgFileName = imgFileName.replace(/-&-/g, '&');
    }

    // Remove file extension from imgFileName
    imgFileName = imgFileName.replace('.html', '');

    // Generate href value based on imgFileName
    var hrefValue = `/games/${imgFileName}.html`;

    // Create a temporary span to measure text width
    var tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.fontSize = 'inherit'; // Use the same font size as in your HTML
    tempSpan.textContent = formattedName;
    document.body.appendChild(tempSpan);
    var textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    // Calculate and adjust letter spacing based on text length
    var maxLetterSpacingReduction = 5;
    var letterSpacing = 'normal'; // Default letter spacing
    if (formattedName.length > 11) { // Adjust threshold for starting compression
        var lengthFactor = Math.min(1, (formattedName.length - 11) / 400); // Normalize length factor
        letterSpacing = `${-maxLetterSpacingReduction * lengthFactor}vw`;
    }

    // Create HTML for each list item with dynamic letter spacing
    html += "<li>";
    html +=
        `<div class="suggest-game" onmouseover="highlightImage2('suggest-imgC${index + 1}', 'suggest-text${index + 1}')" 
         onmouseout="removeHighlight2('suggest-imgC${index + 1}', 'suggest-text${index + 1}')">`;
    html += `<a href="${hrefValue}">`;
    html +=
        `<div class="suggest-text-back-container" style="position: absolute; margin: 0.6vh; width: 20.3vw; height: calc(20.3vw * 9 / 16); overflow: hidden; z-index: 2;">`;
    html +=
        '<div class="suggest-text-back" style="position: absolute; width: 300%; height: 300%; left: -5vw; top: 0vw; background-color: black; opacity: 0;"></div>';
    html += "</div>";
    html +=
        `<img id="suggest-imgC${index + 1}" src="/images/games/${imgFileName}.png" alt="Recently Played" style="margin: 0.6vh; border-radius: 0.4vw; position: relative; height: auto;" />`;
    html += "</a>";
    html += `<a href="${hrefValue}">`;
    html +=
        `<p id="suggest-text${index + 1}" style="letter-spacing: ${letterSpacing}; position: absolute; z-index: 999; left: 1vw; top: calc(100% - 4.1vw); opacity: 0;">
          ${formattedName}
        </p>`;
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
        generateNewPageList();
        generatePageListMULTI();
        generatePageListONLINE();
        generatePageListNEW();
     // checkIframeAndUpdateTitleBar(iframe, titleBar, 5000); // Run for 5 seconds

    
        // Add event listener to the clear button
        document.getElementById("clear-button").addEventListener("click", clearRecentlyVisited);
    };
