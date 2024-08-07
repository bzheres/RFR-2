document.addEventListener("DOMContentLoaded", function() {
    let fuse; // Initialize Fuse.js instance
    let allArticles; // Store all articles for reset

    // Fetch articles data and initialize Fuse.js
    fetch('../../json files/physics_articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const articlePreviews = document.getElementById('article-previews');
            articlePreviews.articleData = data.articles; // Store articles data in element for reference

            allArticles = data.articles; // Store all articles for reset

            // Display all articles initially
            renderArticles(data.articles, articlePreviews);

            // Prepare data for Fuse.js
            const fuseOptions = {
                keys: ['title', 'description', 'keywords'],
                includeScore: true,
                threshold: 0.4, // Adjust as needed
                ignoreLocation: true,
                findAllMatches: true,
                distance: 100, // Adjust as needed
                minMatchCharLength: 2, // Minimum number of characters that must match
            };
            fuse = new Fuse(data.articles, fuseOptions);
        })
        .catch(error => console.error('Error loading articles:', error));

    // Function to render articles
    function renderArticles(articles, container) {
        container.innerHTML = ''; // Clear existing content
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.articleData = article; // Store article data in element
            const titleElement = document.createElement('h2');
            const descriptionElement = document.createElement('p');
            const linkElement = document.createElement('a');

            titleElement.textContent = article.title;
            descriptionElement.textContent = article.description;
            linkElement.textContent = 'Read More';
            linkElement.href = article.url;

            articleElement.appendChild(titleElement);
            articleElement.appendChild(descriptionElement);
            articleElement.appendChild(linkElement);

            container.appendChild(articleElement);
        });
    }

    // Function to perform fuzzy search
    function performSearch(query) {
        if (!fuse) return [];

        if (!query.trim()) {
            return allArticles; // Return all articles if query is empty or only whitespace
        } else {
            const results = fuse.search(query.toLowerCase());
            console.log('Search Results:', results); // Log search results for debugging
            return results.map(result => result.item); // Ensure to return matched articles
        }
    }

    // Function to handle search
    function handleSearch(event) {
        if (event) {
            event.preventDefault(); // Prevent form submission if triggered by form submit
        }
        const searchQuery = document.getElementById('anatomy-search-input').value.trim();
        console.log('Search Query:', searchQuery);

        const matchedArticles = performSearch(searchQuery);
        console.log('Matched Articles:', matchedArticles);

        const articlePreviews = document.getElementById('article-previews');
        renderArticles(matchedArticles, articlePreviews); // Render matched articles
    }

    // Attach handleSearch function to search icon click
    const searchIcon = document.querySelector('.anatomy-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', handleSearch);
    }

    // Attach handleSearch function to form submit if there is a form
    const searchForm = document.querySelector('form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    // Optional: Handle input changes for live search updates
    const searchInput = document.getElementById('anatomy-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            handleSearch(); // Execute search function on input change
        });
    }
});
