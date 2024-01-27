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

function capitalizeFirstLetter(str) {
  return str
    .replace(/(?:^|\.)\s*(\w)/g, function (match) {
      return match.toLowerCase();
    })
    .replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    })
    .replace(/\.(\w)/g, function (match) {
      return "." + match[1].toLowerCase();
    })
    .replace(/&/g, " & "); // Add this line to add spaces around ampersands
}

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
    // Extract the edited name from the URL (excluding the fragment)
    var editedName = page.match(/\/games\/([^\/]+)\.html/);
    editedName = editedName ? editedName[1].replace(/-/g, " ") : "missing";

    // Capitalize the first letter of the first word, excluding the first letter after a dot
    editedName = capitalizeFirstLetter(editedName);

    // Keep the dashes in the image file name
    var imgFileName =
      editedName === "missing"
        ? "missing"
        : editedName.replace(/ /g, "-").replace(/-(&)-/g, "&").toLowerCase(); // Changed here

    // Generate dynamic IDs for suggest-img and suggest-text based on their position in the list
    var imgId = "suggest-img" + (index + 1);
    var textId = "suggest-text" + (index + 1);

    // Determine the href value (excluding the fragment)
    var hrefValue =
      editedName.toLowerCase() === "missing" ? "#" : page.split("#")[0];

    // Adjust font size if the edited name is 19 characters or more
    var fontSizeStyle =
      editedName.length >= 19 ? 'style="font-size: 80%;"' : "";

    // Create the HTML for each list item
    html += "<li>";
    html += '<div class="suggest-game">';
    html += '<a href="' + hrefValue + '">';
    html +=
      '<div style="position: absolute; background-color: rgba(0, 0, 0, 0); z-index: 3; margin-left: 0.4rem; margin-top: -0.4rem; width: 15.45rem; height: 12rem;" onmouseover="highlightImage2(\'' +
      imgId +
      "', '" +
      textId +
      "')\" onmouseout=\"removeHighlight2('" +
      imgId +
      "', '" +
      textId +
      "')\"></div>";
    html +=
      '<img style="outline: 3px solid #fc5858; border: 1px solid #fc5858" id="' +
      imgId +
      '" src="images/games/list/' +
      imgFileName +
      '.png" alt="Recently Played" />';
    html +=
      '<div id="fade-wrapper" style="z-index: -1; position: absolute; width: 16vw; height: 7vh; margin-top: -1.4rem; margin-left: 0.45rem; overflow: hidden; opacity: 0;">';
    html += '<div class="box-shadow"></div>';
    html += "</div>";
    html += "</a>";
    html += '<a href="' + hrefValue + '" ' + fontSizeStyle + ">";
    html += '<span id="' + textId + '">' + editedName + "</span>";
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
  sortList();
  // Add event listener to the clear button
  document
    .getElementById("clear-button")
    .addEventListener("click", clearRecentlyVisited);
};
