const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


// Unsplash API 
const count = 30;
const apiKey = "pSVNEmCLtniBwgXD8RNf9Ipilb_B-r6RBbpmZdwSu1c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
    }
}

// Helper function that set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    loader.hidden = true;
    photosArray.forEach((photo) => {
        // Create <a> element and set attributes
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });
        // Create <img> element for photo and set attributes
        const image = document.createElement("img");
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Add EventListener to check when each image has loaded
        image.addEventListener("load", imageLoaded);
        // Put <img> element in <a> element and put them together into the imageContainer
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getRandomPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}

// Load more photos before user reaches the bottom of the page
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getRandomPhotos();
    }
})

// On Load
getRandomPhotos();