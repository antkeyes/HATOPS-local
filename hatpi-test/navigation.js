document.addEventListener("DOMContentLoaded", function() {
    const imageDisplay = document.getElementById('imageDisplay');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');

    // Correct the fetch URL to match the directory structure
    fetch('./images/')  // Fetch directly from the images directory
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            // Correctly format the links by ensuring only image files are processed
            const links = Array.from(doc.querySelectorAll('a'))
                               .map(link => './images/' + link.getAttribute('href'))
                               .filter(href => href.endsWith('.jpg'));  // Ensure only JPEG images

            let currentIndex = 0;

            // Update image display
            const updateImage = () => {
                if (links[currentIndex]) {  // Check if the link is defined
                    imageDisplay.src = links[currentIndex];
                    console.log(links[currentIndex]);  // Log the URL to verify it's correct
                }
            };

            // Navigation functions
            const showNextImage = () => {
                currentIndex = (currentIndex + 1) % links.length;
                updateImage();
            };

            const showPreviousImage = () => {
                currentIndex = (currentIndex - 1 + links.length) % links.length;
                updateImage();
            };

            leftArrow.addEventListener('click', showPreviousImage);
            rightArrow.addEventListener('click', showNextImage);

            // Keyboard navigation
            document.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight') {
                    showNextImage();
                } else if (event.key === 'ArrowLeft') {
                    showPreviousImage();
                }
            });

            // Initialize with the first image
            updateImage();
        }).catch(error => {
            console.error("Failed to load image directory:", error);
        });
});
