document.addEventListener("DOMContentLoaded", function() {
    const referencesSection = document.querySelector('.article .references');
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'References'; // Initial text for the toggle button
    toggleButton.classList.add('toggle-button'); // Optional: Add a class for styling

    // Append the toggle button to the article
    referencesSection.parentNode.insertBefore(toggleButton, referencesSection);

    function toggleReferences() {
        if (referencesSection.style.display === 'none' || referencesSection.style.display === '') {
            referencesSection.style.display = 'block';
            toggleButton.textContent = 'Close References'; // Change text when references are shown
        } else {
            referencesSection.style.display = 'none';
            toggleButton.textContent = 'References'; // Change text when references are hidden
        }
    }

    // Initial hide for references section
    referencesSection.style.display = 'none';

    // Event listener for the toggle button
    toggleButton.addEventListener('click', toggleReferences);

    // Adjust scroll position to account for the height of the navbar
    function adjustScrollPosition(targetElement) {
        const navbarHeight = 80; 
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Function to open references and scroll to a specific reference
    function openReferencesAndScroll(targetId) {
        if (referencesSection.style.display === 'none' || referencesSection.style.display === '') {
            toggleReferences();
        }
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            adjustScrollPosition(targetElement);
        }
    }

    // Attach event listener to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            openReferencesAndScroll(targetId);
        });
    });

    // Adjust scroll position on page load if there's a hash in the URL
    if (window.location.hash) {
        const targetElement = document.getElementById(window.location.hash.substring(1));
        if (targetElement) {
            adjustScrollPosition(targetElement);
        }
    }
});
