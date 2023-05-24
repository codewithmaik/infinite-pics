const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API 
const count = 10;
const apiKey = "pSVNEmCLtniBwgXD8RNf9Ipilb_B-r6RBbpmZdwSu1c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for links and photos and add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> element that links to Unsplash
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        // Create <img> element for photo
        const image = document.createElement("img");
        image.setAttribute("src", photo.urls.regular);
        image.setAttribute("alt", photo.alt_description);
        image.setAttribute("title", photo.alt_description);
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