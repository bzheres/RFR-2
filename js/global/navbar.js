document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("[id='navbar']");
    elements.forEach(el => {
        // Determine the base path based on the current HTML file's location
        const currentPath = window.location.pathname; // Get the current page's path
        let basePath = '/html/'; // Base path where HTML files are located

        // Adjust basePath based on currentPath
        if (currentPath.includes('anatomy/intro to anatomy')) {
            basePath = '/html/anatomy/intro to anatomy/'; // Adjust path for anatomical_position.html
        } else {
            basePath = '/html/other/'; // Default path for other HTML files (like index.html)
        }

        // Construct the relative path to navbar.html
        const navbarPath = `${basePath}navbar.html`;

        fetch(navbarPath) // Use the dynamically constructed path
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;

                // Call setup functions after HTML insertion
                setupNavbarFunctionality();
            })
            .catch(error => {
                console.error('Error fetching navbar HTML:', error);
            });
    });
});

function setupNavbarFunctionality() {
    // Initialize Netlify Identity
    setupNetlifyIdentity();

    // Theme toggle setup
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);

        // Update theme dropdown text
        updateThemeDropdown(currentTheme);
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Mobile menu toggle functionality
    const navbarToggle = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar_menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    // Modal setup function
    setupModal();

    // Handle theme change from settings dropdown
    const themeDropdown = document.getElementById('theme');

    if (themeDropdown) {
        themeDropdown.addEventListener('change', function() {
            const selectedTheme = themeDropdown.value;
            applyTheme(selectedTheme);
            localStorage.setItem('theme', selectedTheme);

            // Update theme dropdown text
            updateThemeDropdown(selectedTheme);
        });

        // Set initial theme based on localStorage or default
        const storedTheme = localStorage.getItem('theme') || 'light';
        themeDropdown.value = storedTheme;
        applyTheme(storedTheme);

        // Update dropdown text initially
        updateThemeDropdown(storedTheme);
    } else {
        console.error('Theme dropdown element not found.');
    }

    // Setup search functionality
    const searchInput = document.querySelector('.searchbar input');
    if (searchInput) {
        searchInput.addEventListener('keydown', handleSearch);
    }
}

function handleSearch(event) {
    const searchInput = document.querySelector('.searchbar input');
    if (!searchInput) return;

    if (event.key === 'Enter') {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            // Update this path to match the location of search_results.html
            const searchUrl = `/html/other/search_results.html?q=${encodeURIComponent(searchQuery)}`;
            window.location.href = searchUrl;
        }
    }
}

function setupModal() {
    // Modal functionality
    const modal = document.getElementById('myModal');
    const profileButton = document.getElementById('profilebutton');
    const joinupButton = document.getElementById('joinup'); // Added joinupButton
    const closeButton = modal.querySelector('.close');

    if (profileButton && closeButton) {
        profileButton.addEventListener('click', function () {
            openModal();
        });
    } else {
        console.error('Profile button or close button not found in modal setup.');
    }

    if (joinupButton && closeButton) {
        joinupButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default action of the link
            openModal();
        });
    } else {
        console.error('Joinup button or close button not found in modal setup.');
    }

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab a');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1); // Get tab ID without '#'
            showTab(target); // Display the clicked tab
        });
    });
}

function openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'block';
        showTab('signup'); // Show the signup tab by default
    } else {
        console.error('Modal element not found.');
    }
}

function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content > div');
    tabContents.forEach(content => {
        if (content.id === tabName) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });

    // Activate current tab
    const tabGroup = document.querySelector('.tab-group');
    const activeTab = tabGroup.querySelector('.active');
    if (activeTab) {
        activeTab.classList.remove('active');
    }

    const newActiveTab = tabGroup.querySelector(`a[href="#${tabName}"]`);
    if (newActiveTab) {
        newActiveTab.parentNode.classList.add('active');
    } else {
        console.error(`Tab ${tabName} not found.`);
    }
}

function updateThemeDropdown(theme) {
    const themeDropdown = document.getElementById('theme');
    if (themeDropdown) {
        themeDropdown.value = theme;
    }
}

function setupNetlifyIdentity() {
    netlifyIdentity.on('init', user => {
        console.log('Netlify Identity user:', user);
        if (user) {
            // User is logged in, perform actions based on user state
            handleUserLoggedIn(user);
        }
    });

    netlifyIdentity.on('login', user => {
        console.log('Login event:', user);
        document.getElementById('myModal').style.display = 'none';
        handleUserLoggedIn(user);
    });

    netlifyIdentity.on('logout', () => {
        console.log('Logout event');
        handleUserLoggedOut();
    });

    netlifyIdentity.on('error', err => {
        console.error('Error event:', err);
    });

    netlifyIdentity.on('open', () => {
        console.log('Widget opened');
    });

    netlifyIdentity.on('close', () => {
        console.log('Widget closed');
    });

    netlifyIdentity.init();
}

function handleUserLoggedIn(user) {
    // Perform actions like showing a "Save Article" button, etc.
}

function handleUserLoggedOut() {
    // Perform actions like hiding user-specific options
}
