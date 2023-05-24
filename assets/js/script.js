const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API 
const count = 10;
const apiKey = "pSVNEmCLtniBwgXD8RNf9Ipilb_B-r6RBbpmZdwSu1c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function that set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> element and set attributes
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
        // Create <img> element for photo and set attributes
        const image = document.createElement("img");
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Put <img> element in <a> element and put them together into the imageContainer
        item.appendChild(image);
        imageContainer.appendChild(item);
    })
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

// On Load
getRandomPhotos();