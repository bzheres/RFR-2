// text_size.js

// Function to update text sizes based on selection
function updateTextSize(size) {
    switch (size) {
        case 'normal':
            document.documentElement.style.setProperty('--body-font-size', '16px');
            document.documentElement.style.setProperty('--h1-font-size', '2em');
            document.documentElement.style.setProperty('--h2-font-size', '1.75em');
            document.documentElement.style.setProperty('--h3-font-size', '1.5em');
            document.documentElement.style.setProperty('--h4-font-size', '1.25em');
            document.documentElement.style.setProperty('--h5-font-size', '1em');
            document.documentElement.style.setProperty('--h6-font-size', '0.875em');
            break;
        case 'large':
            document.documentElement.style.setProperty('--body-font-size', '18px');
            document.documentElement.style.setProperty('--h1-font-size', '2.25em');
            document.documentElement.style.setProperty('--h2-font-size', '2em');
            document.documentElement.style.setProperty('--h3-font-size', '1.75em');
            document.documentElement.style.setProperty('--h4-font-size', '1.5em');
            document.documentElement.style.setProperty('--h5-font-size', '1.25em');
            document.documentElement.style.setProperty('--h6-font-size', '1.125em');
            break;
        case 'larger':
            document.documentElement.style.setProperty('--body-font-size', '20px');
            document.documentElement.style.setProperty('--h1-font-size', '2.5em');
            document.documentElement.style.setProperty('--h2-font-size', '2.25em');
            document.documentElement.style.setProperty('--h3-font-size', '2em');
            document.documentElement.style.setProperty('--h4-font-size', '1.75em');
            document.documentElement.style.setProperty('--h5-font-size', '1.5em');
            document.documentElement.style.setProperty('--h6-font-size', '1.375em');
            break;
        case 'largest':
            document.documentElement.style.setProperty('--body-font-size', '22px');
            document.documentElement.style.setProperty('--h1-font-size', '2.75em');
            document.documentElement.style.setProperty('--h2-font-size', '2.5em');
            document.documentElement.style.setProperty('--h3-font-size', '2.25em');
            document.documentElement.style.setProperty('--h4-font-size', '2em');
            document.documentElement.style.setProperty('--h5-font-size', '1.75em');
            document.documentElement.style.setProperty('--h6-font-size', '1.625em');
            break;
        default:
            break;
    }

    // Store selected text size preference in localStorage
    localStorage.setItem('textSizePreference', size);
}

// Function to apply stored text size preference on page load
function applyStoredTextSize() {
    var storedSize = localStorage.getItem('textSizePreference');
    if (storedSize) {
        updateTextSize(storedSize);
        document.getElementById('text-size').value = storedSize;
    }
}

// Event listener for dropdown change
document.addEventListener('DOMContentLoaded', function() {
    // Apply stored text size preference on page load
    applyStoredTextSize();

    // Event listener for dropdown change
    document.getElementById('text-size').addEventListener('change', function() {
        var selectedSize = this.value;
        updateTextSize(selectedSize);
    });
});
