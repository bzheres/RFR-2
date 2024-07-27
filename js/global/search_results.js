function fetchSearchResults(query) {
    console.log('Fetching search results for:', query);

    // URLs for your JSON files
    const anatomyArticlesURL = '../../json files/anatomy_articles.json';
    const physicsArticlesURL = '../../json files/physics_articles.json';
    const imageInterpretationArticlesURL = '../../json files/image_interpretation_articles.json';

    // Fetch all JSON data concurrently
    //PLEASE CHECK HERE
    //THIS IS WHERE I CHANGED "Promise.all" to PROMISE.all" TO BREAK THE SEARCH WHILE THE SITE IS BEING PREPARED
    
    // SEE ABOVE
    //SEE ABOVE
    PROMISE.all([
        fetch(anatomyArticlesURL).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${anatomyArticlesURL}: ${response.statusText}`);
            }
            return response.json();
        }),
        fetch(physicsArticlesURL).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${physicsArticlesURL}: ${response.statusText}`);
            }
            return response.json();
        }),
        fetch(imageInterpretationArticlesURL).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${imageInterpretationArticlesURL}: ${response.statusText}`);
            }
            return response.json();
        })
    ])
    .then(data => {
        console.log('Fetched data:', data);
        // Extract articles from each JSON response and combine into a single array
        const allArticles = data.flatMap(json => json.articles || []);
        console.log('Combined articles:', allArticles);

        // Set up Fuse.js for searching
        const fuseOptions = {
            keys: ["title", "description", "url"],
            includeScore: true, // Optional: include score in search results
            threshold: 0.3 // Optional: adjust threshold for fuzzy search
        };
        const fuse = new Fuse(allArticles, fuseOptions);
        const results = fuse.search(query);
        console.log('Search results:', results);

        // Clear previous results
        const searchResultsDiv = document.getElementById('search-results');
        searchResultsDiv.innerHTML = '';

        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-card');

                resultItem.innerHTML = `
                    <div class="search-card-header">
                        <h3 class="search-card-title">${result.item.title}</h3>
                    </div>
                    <div class="search-card-body">
                        <p class="search-card-description">${result.item.description}</p>
                        <a href="${result.item.url}" class="search-card-link">Read more</a>
                    </div>
                `;
                searchResultsDiv.appendChild(resultItem);
            });
        } else {
            searchResultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
        }
    })
    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
        const searchResultsDiv = document.getElementById('search-results');
        searchResultsDiv.innerHTML = `<p>Error fetching search results. Please try again later.</p>`;
    });
}

// Function to extract query parameter from URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch search results on page load if there's a query parameter
document.addEventListener("DOMContentLoaded", function() {
    const query = getQueryParameter('q');
    if (query) {
        fetchSearchResults(query);
    }
});
