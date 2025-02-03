// Function to generate the pages from pagesData
function generatePages() {
    const pageList = document.getElementById("thumbnails-played");
    pageList.innerHTML = ""; // Clear previous content

    // Iterate through each page in pagesData
    pagesData.forEach(function (page, index) {
        const formattedName = page.formatted_Name || "missing"; // Default value for formattedName
        const pageName = page.name || "missing"; // Default value for pageName

        // Calculate playtime for the current game
        const playtimeText = "Never Played"; // Default value for playtime

        // Calculate and adjust letter spacing
        var maxLetterSpacingReduction = 5;
        var letterSpacing = "normal";
        if (formattedName.length > 11) {
            var lengthFactor = Math.min(1, (formattedName.length - 11) / 400);
            letterSpacing = `${-maxLetterSpacingReduction * lengthFactor}vw`;
        }

        // Create a div for each page
        const div = document.createElement('div');
        div.classList.add('suggest-game-container');
        
        const li = document.createElement('li');
        li.classList.add('suggest-game');
        
        li.innerHTML = `
<div class="suggest-game" onmouseover="highlightImage2('suggest-img${index + 1}', 'suggest-text${index + 1}')" 
onmouseout="removeHighlight2('suggest-img${index + 1}', 'suggest-text${index + 1}')">

<a href="games/${pageName}.html">
<div class="suggest-text-back-container" style="position: absolute; margin: 0.6vh; width: 16.8vw; height: calc(20.3vw * 9 / 16); overflow: hidden; z-index: 2;">
  <div class="suggest-text-back" style="position: absolute; width: 300%; height: 300%; left: -5vw; top: 0vw; background-color: black; opacity: 0;"></div>
</div>
<img id="suggest-img${index + 1}" src="/images/test/${pageName}.png" alt="${pageName}" style="margin: 0.6vh; border-radius: 0.4vw; position: relative; height: auto;" />
<p id="suggest-text${index + 1}" style="letter-spacing: ${letterSpacing}; position: absolute; z-index: 999; left: 1.25vw; top: calc(100% - 4.75vw - 0.9rem); opacity: 0; text-align: left;">
<span style="display: block; margin-bottom: -0.5rem;">${formattedName}</span>
<span style="font-size: 0.95rem; margin: 0; padding: 0; color: #d9d9d9; letter-spacing: normal">${playtimeText}</span>
</p>
</a>
</div>
`;

        div.appendChild(li);
        pageList.appendChild(div);
    });

}

// Call the generatePages function when the page loads
window.onload = function () {
    generatePages();
};
