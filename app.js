async function fetchStyles() {
    try {
        const response = await fetch('https://somnium.zarox.workers.dev/styles/');
        const data = await response.json();
        const styles = data.styles;
        const styleSelect = document.getElementById('style');
        Object.entries(styles).forEach(([name, style]) => {
            const option = document.createElement('option');
            option.value = style.id;
            option.textContent = name;
            styleSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching styles:', error);
    }
}

async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const style = document.getElementById('style').value;
    const loadingIndicator = document.getElementById('loading');
    const imageContainer = document.getElementById('imageContainer');
    const generatedImage = document.getElementById('generatedImage');

    if (!prompt || !style) {
        alert('Please provide both a prompt and select a style.');
        return;
    }

    loadingIndicator.style.display = 'block';
    // imageContainer.style.display = 'none';
    generatedImage.src = '';

    try {
        const response = await fetch(`https://somnium.zarox.workers.dev/generate/?prompt=${encodeURIComponent(prompt)}&style=${style}`);
        const data = await response.json();

        loadingIndicator.style.display = 'none';
        if (data.action === 'success') {
            generatedImage.src = data.image;
            // imageContainer.style.display = 'block';
        } else {
            alert('Error generating image');
        }
    } catch (error) {
        loadingIndicator.style.display = 'none';
        alert('Error generating image');
        console.error('Error generating image:', error);
    }
}

document.getElementById('generateButton').addEventListener('click', generateImage);

window.onload = fetchStyles;
