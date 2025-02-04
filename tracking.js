// TRACK PAGE FUNCTION
function trackPage() {
    console.log("[trackPage] Called");
    // Get the current page URL without fragment or query parameters.
    const currentPage = window.location.href.split("#")[0].split("?")[0];
    let visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  
    if (currentPage.includes("/games/")) {
      // Remove any occurrence of this page (ignoring fragments)
      visitedPages = visitedPages.filter(page => page.split("#")[0] !== currentPage);
      // Add current page at the beginning if not already present.
      if (!visitedPages.includes(currentPage)) {
        visitedPages.unshift(currentPage);
      }
    }
  
    // Remove duplicates and limit to 4 entries.
    const uniqueVisitedPages = [...new Set(visitedPages)].slice(0, 4);
    localStorage.setItem("visitedPages", JSON.stringify(uniqueVisitedPages));
  
    // Call displayVisitedPages once.
    displayVisitedPages();
    console.log("[trackPage] Finished");
  }
  
  // PLAYTIME CALCULATION FUNCTION
  async function calculatePlaytimeRECENT(gameId) {
    try {
      const logs = await getPlaytimeLogs(gameId);
      if (logs.length === 0) return "Under 1 Minute";
      const gamePlaytime = logs.length;
      if (gamePlaytime === 1) return "1 minute";
      return `${gamePlaytime} minutes`;
    } catch (error) {
      console.error("[calculatePlaytimeRECENT] Error calculating playtime:", error);
      return "Under 1 Minute";
    }
  }
  
  // DISPLAY VISITED PAGES FUNCTION
  async function displayVisitedPages() {
    console.log("[displayVisitedPages] Called");
  
    // Get the container and clear it
    const pageList = document.getElementById("recently-played");
    if (!pageList) {
      console.error("[displayVisitedPages] No element with ID 'recently-played' found.");
      return;
    }
    pageList.innerHTML = ""; // Clear the container
  
    // Retrieve visitedPages (or an empty array if none)
    let visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
    console.log("[displayVisitedPages] visitedPages from localStorage:", visitedPages);
  
    // Force exactly 4 entries: slice to 4 if too many, or add "missing" if too few.
    if (visitedPages.length > 4) {
      visitedPages = visitedPages.slice(0, 4);
    } else {
      while (visitedPages.length < 4) {
        visitedPages.push("missing");
      }
    }
    console.log("[displayVisitedPages] Processed visitedPages (exactly 4 entries):", visitedPages);
  
    // To avoid duplicate random game picks, track the ones we've used.
    const usedRandomGames = new Set();
    // Create a document fragment to hold the new list items.
    const fragment = document.createDocumentFragment();
  
    // Loop through the 4 visitedPages entries.
    for (const [index, page] of visitedPages.entries()) {
      let pageName, formattedName, playtimeText;
  
      if (page === "missing") {
        // For a "missing" entry, choose a random game from pagesData.
        let randomPage;
        const maxAttempts = 10;
        let attempts = 0;
        do {
          randomPage = pagesData[Math.floor(Math.random() * pagesData.length)];
          attempts++;
        } while (usedRandomGames.has(randomPage.name) && attempts < maxAttempts);
        usedRandomGames.add(randomPage.name);
  
        pageName = randomPage.name;
        formattedName = randomPage.formatted_Name;
        playtimeText = "Never Played"; // Skip playtime calculation for random entries.
      } else {
        // For a visited page, assume the URL is in the format "/games/foo.html".
        const editedName = page.match(/\/games\/([^\/]+)\.html/);
        pageName = editedName ? editedName[1] : "missing";
  
        // Look up the formatted name in pagesData.
        formattedName = "missing";
        pagesData.forEach(vpage => {
          if (vpage.name === pageName) {
            formattedName = vpage.formatted_Name;
          }
        });
  
        // Calculate the playtime for this game.
        try {
          playtimeText = await calculatePlaytimeRECENT(pageName);
        } catch (error) {
          console.error("[displayVisitedPages] Error retrieving playtime for", pageName, error);
          playtimeText = "Error";
        }
      }
  
      // Calculate letter spacing based on the length of the formatted name.
      const maxLetterSpacingReduction = 0.2;
      const thresholdLength = 20;
      const letterSpacing =
        formattedName.length > thresholdLength
          ? `${-Math.min(maxLetterSpacingReduction, Math.pow((formattedName.length - thresholdLength) / 10, 2))}vw`
          : "normal";
  
      // Build the markup for one list item.
      // There is only one <div class="suggest-game"> per <li>.
      if (!(localStorage.getItem('playtime-log') && localStorage.getItem('playtime-log').includes("playtime-hide"))) {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="suggest-game" 
             onmouseover="highlightImage2('suggest-img${index+1}', 'suggest-text${index+1}')" 
             onmouseout="removeHighlight2('suggest-img${index+1}', 'suggest-text${index+1}')">
          <a href="games/${pageName}.html">
            <div class="suggest-text-back-container" 
                 style="position:absolute; margin:0.6vh; width:16.8vw; height:calc(20.3vw * 9 / 16); overflow:hidden; z-index:2;">
              <div class="suggest-text-back" 
                   style="position:absolute; width:300%; height:300%; left:-5vw; top:0vw; background-color:black; opacity:0;"></div>
            </div>
            <img id="suggest-img${index+1}" 
                 src="/images/games/${pageName}.png" 
                 alt="${pageName}" 
                 style="margin:0.6vh; border-radius:0.4vw; position:relative; height:auto;" />
            <p id="suggest-text${index+1}" 
               style="letter-spacing:${letterSpacing}; position:absolute; z-index:999; left:1.25vw; top:calc(100% - 4.75vw - 0.9rem); opacity:0; text-align:left;">
              <span style="display:block; margin-bottom:-0.5rem;">${formattedName}</span>
              <span style="font-size:0.95rem; margin:0; padding:0; color:#d9d9d9; letter-spacing:normal; line-height:1; display:inline-flex; align-items:center;">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     style="width:1em; height:1em; fill:currentColor; vertical-align:middle; margin-right:0.15em; filter:drop-shadow(0px 0px 4px #000) drop-shadow(0px 0px 2px #000) drop-shadow(0px 0px 4px #000);" 
                     viewBox="0 -960 960 960">
                  <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
                </svg>
                ${playtimeText}
              </span>
            </p>
          </a>
        </div>
      `;
      pageList.appendChild(li);
    }
    else {
      const li = document.createElement('li');
      li.innerHTML = `
      <div class="suggest-game" 
             onmouseover="highlightImage2('suggest-img${index+1}', 'suggest-text${index+1}')" 
             onmouseout="removeHighlight2('suggest-img${index+1}', 'suggest-text${index+1}')">
          <a href="games/${pageName}.html">
            <div class="suggest-text-back-container" 
                 style="position:absolute; margin:0.6vh; width:16.8vw; height:calc(20.3vw * 9 / 16); overflow:hidden; z-index:2;">
              <div class="suggest-text-back" 
                   style="position:absolute; width:300%; height:300%; left:-5vw; top:0vw; background-color:black; opacity:0;"></div>
            </div>
            <img id="suggest-img${index+1}" 
                 src="/images/games/${pageName}.png" 
                 alt="${pageName}" 
                 style="margin:0.6vh; border-radius:0.4vw; position:relative; height:auto;" />
            <p id="suggest-text${index+1}" 
               style="letter-spacing: ${letterSpacing}; position: absolute; z-index: 999; left: 1.25vw; top: calc(100% - 4.75vw - 1.2rem); opacity: 0; text-align: left;">
                      <span style="display: block; margin-bottom: -0.5rem;">${formattedName}</span>
                  </p>
            </p>
          </a>
        </div>
      `;
      pageList.appendChild(li);
    
    // Append exactly 4 list items to the container.
    console.log("[displayVisitedPages] Finished; list items appended.");
  }
    }
}

  


function clearRecentlyVisited() {
    localStorage.removeItem("visitedPages");
    displayVisitedPages();
}

window.onload = function () {     
trackPage();     
//displayVisitedPages();    
generatePageList();    
generateNewPageList();  

generatePageListMULTI();
generatePageListONLINE();     
generatePageListNEW(); 



};
