document.addEventListener("DOMContentLoaded", function() {
    // Add the Netlify Identity Widget script
    const netlifyIdentityScript = document.createElement('script');
    netlifyIdentityScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    document.head.appendChild(netlifyIdentityScript);

    // Function to open Netlify Identity widget
    function openNetlifyIdentity() {
        const container = createContainer();
        netlifyIdentity.open();
    }

    // Event listener for the "Join Up" button
    const joinButton = document.getElementById('joinup');
    if (joinButton) {
        joinButton.addEventListener('click', openNetlifyIdentity);
    } else {
        console.error('Join Up button not found.');
    }

    // Create or get the container for the widget
    function createContainer() {
        let container = document.getElementById('netlify-identity-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'netlify-identity-container';
            container.style.position = 'fixed';
            container.style.top = '100px'; // Adjust based on your navbar height
            container.style.zIndex = '9999'; // Ensure it's above other elements
            container.style.width = '100%'; // Adjust width if needed
            document.body.appendChild(container);
        }
        return container;
    }
});
