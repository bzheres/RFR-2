document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("[id='footer']");
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
        
        // Construct the relative path to footer.html
        const footerPath = `${basePath}footer.html`;

        fetch(footerPath) // Use the dynamically constructed path
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log('Fetched HTML:', data);
                el.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching footer HTML:', error);
            });
    });
});
