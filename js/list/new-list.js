function generateNewPageList() {
    const pageList = document.getElementById('pageListNEW');
    pageList.innerHTML = ""; // Clear previous content

    // Sort pages by date (newest first)
    pagesData.sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      if (dateA.getTime() === dateB.getTime()) {
        return a.name.localeCompare(b.name);
      }
      return dateB.getTime() - dateA.getTime();
    });

    // Limit to the first 15 items after sorting
    const itemsToShow = pagesData.slice(0, 8);

    itemsToShow.forEach((page, index) => {
      // Format the full name
      const formattedName = page.formatted_Name;

      var maxLetterSpacingReduction = 0.2; // Maximum reduction in 'vw' units
      var thresholdLength = 25; // Start reducing spacing after this many characters
      
      // Calculate letter spacing
      var letterSpacing;
        if (formattedName.length > 24) {
          letterSpacing = `-${(formattedName.length - 20) * 0.014}rem`;
      } else {
        letterSpacing = "normal";
      }

      const li = document.createElement('li');
      li.innerHTML = `
      <div class="suggest-game" onmouseover="highlightImageL('suggest-imgN${index + 1}', 'suggest-textN${index + 1}')" 
  onmouseout="removeHighlightL('suggest-imgN${index + 1}', 'suggest-textN${index + 1}')">

<a href="games/${page.name}.html">
  <div class="suggest-text-back-container" style="position: absolute; margin: 0.6vh; width: 16.8vw; height: calc(20.3vw * 9 / 16); overflow: hidden; z-index: 2;">
    <div class="suggest-text-back" style="position: absolute; width: 300%; height: 300%; left: -5vw; top: 0vw; background-color: black; opacity: 0;"></div>
  </div>
  <img id="suggest-imgN${index + 1}" src="/images/games-512/${page.name}.png" alt="${page.name}" style="margin: 0.6vh; border-radius: 0.4vw; position: relative; width: 16.8vw; height: auto;" />
  <p id="suggest-textN${index + 1}" style="letter-spacing: ${letterSpacing}; position: absolute; z-index: 999; left: 1.25vw; top: calc(100% - 4.75vw); opacity: 0;">
    ${formattedName}
  </p>
</a>
</div>




  `;
      pageList.appendChild(li);
    });
  }