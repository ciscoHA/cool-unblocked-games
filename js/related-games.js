document.addEventListener('DOMContentLoaded', function () {

    const relatedGameLimit = 5;  // You can change this to 200 or whatever number you want

    // Get the current page name from the URL
    const currentPageURL = window.location.pathname;
    const pageName = currentPageURL.split('/games/')[1]?.split('.html')[0];

    // Find the page entry from the pagesData array
    const pageEntry = pagesData.find(page => page.name === pageName);
    const category = pageEntry?.category || "";
    const formattedName = pageEntry?.formatted_Name || "";

    // Function to normalize and split tags into lowercase words, excluding "demo"
    function normalizeTags(tags) {
        return tags.toLowerCase().split(' ')
            .map(tag => tag.trim())
            .filter(tag => tag !== "demo"); // Exclude "demo"
    }

    // Function to get related games based on criteria
    function getRelatedGames() {
        // Exclude certain categories such as "demo"
        const excludedCategory = "demo";
        const allRelatedGames = pagesData.filter(page =>
            page.name !== pageName && page.category.toLowerCase() !== excludedCategory
        );

        return allRelatedGames;
    }

    // Function to sort related games based on category match
    function sortGames(games) {
        return games.sort((a, b) => {
            // Calculate category match percentages
            const categoryMatchA = calculateCategoryMatchPercentage(a.category);
            const categoryMatchB = calculateCategoryMatchPercentage(b.category);

            // First, prioritize category match percentage
            if (categoryMatchA !== categoryMatchB) return categoryMatchB - categoryMatchA;

            // Finally, use formatted name match percentage if all other conditions are the same
            const formattedNameMatchA = calculateFormattedNameMatchPercentage(a.formatted_Name);
            const formattedNameMatchB = calculateFormattedNameMatchPercentage(b.formatted_Name);
            return formattedNameMatchB - formattedNameMatchA;
        });
    }

    // Function to calculate category match percentage based on the current page's categories
    function calculateCategoryMatchPercentage(gameTags) {
        const currentPageTags = normalizeTags(category);  // Tags for the current page
        const gameTagsNormalized = normalizeTags(gameTags);  // Tags for the current game

        // Find matches of current page's categories in the game's categories
        const matchingTags = currentPageTags.filter(tag => gameTagsNormalized.includes(tag));
        const matchPercentage = (matchingTags.length / currentPageTags.length) * 100;

        return matchPercentage.toFixed(2);  // Return percentage with two decimals
    }

    // Function to calculate formatted name match percentage (ignoring spaces)
    function calculateFormattedNameMatchPercentage(gameFormattedName) {
        const normalizedCurrentFormattedName = formattedName.replace(/\s+/g, '').toLowerCase();
        const normalizedGameFormattedName = gameFormattedName.replace(/\s+/g, '').toLowerCase();

        let matchCount = 0;

        // Compare character by character
        for (let i = 0; i < Math.min(normalizedGameFormattedName.length, normalizedCurrentFormattedName.length); i++) {
            if (normalizedGameFormattedName[i] === normalizedCurrentFormattedName[i]) {
                matchCount++;
            }
        }

        // Calculate match percentage based on matching characters
        const maxLength = Math.max(normalizedGameFormattedName.length, normalizedCurrentFormattedName.length);
        return ((matchCount / maxLength) * 100).toFixed(2); // Return percentage with two decimals
    }

    function showRelatedGames() {
        const allRelatedGames = getRelatedGames(); // Get all the related games
        const relatedGamesContainer = document.getElementById('relatedGamesContainer');
        relatedGamesContainer.innerHTML = '';

        const sortedGames = sortGames(allRelatedGames); // Sort all related games based on matches

        // Display only the top 'relatedGameLimit' games
        sortedGames.slice(0, relatedGameLimit).forEach((game, index) => {
            const link = document.createElement('a');
            link.href = `/games/${game.name}.html`;
            link.classList.add('related-game'); // Add a class for styling

            // Create an image element
            const image = document.createElement('img');
            image.src = `/images/games/${game.name}.png`;
            image.alt = game.formatted_Name;

            // Set CSS styles to ensure 16:9 aspect ratio
            image.style.width = '200px';
            image.style.height = 'auto';
            image.style.aspectRatio = '16/9';  // Ensures 16:9 aspect ratio

            // Create the span for the game's formatted name
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('game-name');
            nameSpan.textContent = game.formatted_Name;

            // Append the span inside the image link
            link.appendChild(image);
            link.appendChild(nameSpan);

            // Append the link to the container
            relatedGamesContainer.appendChild(link);
        });
    }

    // Call the function to show related games on page load
    showRelatedGames();
});
