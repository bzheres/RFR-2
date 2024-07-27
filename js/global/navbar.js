// Add the Netlify Identity Widget script
const netlifyIdentityScript = document.createElement('script');
netlifyIdentityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
document.head.appendChild(netlifyIdentityScript);

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
                checkUserStatus();
            })
            .catch(error => {
                console.error('Error fetching navbar HTML:', error);
            });
    });
});

function setupNavbarFunctionality() {
    // Initialize Netlify Identity
    netlifyIdentity.on('init', user => {
        console.log('Netlify Identity Widget initialized');
        updateUserStatus(user);
    });

    // Listen for login events
    netlifyIdentity.on('login', user => {
        console.log('User logged in:', user);
        updateUserStatus(user);
        netlifyIdentity.close();
    });

    // Listen for logout events
    netlifyIdentity.on('logout', () => {
        console.log('User logged out');
        updateUserStatus(null);
    });

    // Profile button setup
    const profileButton = document.getElementById('profilebutton');

    if (profileButton) {
        profileButton.addEventListener('click', () => {
            netlifyIdentity.open(); // Open Netlify Identity Widget modal
        });
    } else {
        console.error('Profile button not found.');
    }

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

function updateThemeDropdown(theme) {
    const themeDropdown = document.getElementById('theme');
    if (themeDropdown) {
        themeDropdown.value = theme;
    }
}

function updateUserStatus(user) {
    const profileButton = document.getElementById('profilebutton');
    if (user) {
        profileButton.innerHTML = `<i class="fa fa-user-md" aria-hidden="true"></i> ${user.email}`;
    } else {
        profileButton.innerHTML = '<i class="fa fa-user-md" aria-hidden="true"></i>';
    }
}

function checkUserStatus() {
    const currentUser = netlifyIdentity.currentUser();
    updateUserStatus(currentUser);
}

