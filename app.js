// Fetch styles from the API and populate the style select dropdown
async function fetchStyles() {
    try {
        const response = await fetch('https://somnium.zarox.workers.dev/styles/');
        const data = await response.json();
        const styles = data.styles;

        const styleSelect = document.getElementById('style');
        Object.entries(styles).forEach(([id, style]) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = style.name;
            styleSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching styles:', error);
    }
}

// Handle image generation request
async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const style = document.getElementById('style').value;
    const loadingIndicator = document.getElementById('loading');
    const imageContainer = document.getElementById('imageContainer');
    const generatedImage = document.getElementById('generatedImage');

    // Check if prompt and style are provided
    if (!prompt || !style) {
        alert('Please provide both a prompt and select a style.');
        return;
    }

    // Show loading indicator and hide image container
    loadingIndicator.style.display = 'block';
    imageContainer.style.display = 'none';
    generatedImage.src = '';

    try {
        // Request image generation from the API
        const response = await fetch(`https://somnium.zarox.workers.dev/generate/?prompt=${encodeURIComponent(prompt)}&style=${style}`);
        const data = await response.json();

        // Hide loading indicator and display the image
        loadingIndicator.style.display = 'none';
        if (data.action === 'success') {
            generatedImage.src = data.image;
            imageContainer.style.display = 'block';
        } else {
            alert('Error generating image');
        }
    } catch (error) {
        loadingIndicator.style.display = 'none';
        alert('Error generating image');
        console.error('Error generating image:', error);
    }
}

// Event listener for the generate button
document.getElementById('generateButton').addEventListener('click', generateImage);

// Fetch styles when the page loads
window.onload = fetchStyles;
