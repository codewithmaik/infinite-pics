const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API 
const count = 10;
const apiKey = "pSVNEmCLtniBwgXD8RNf9Ipilb_B-r6RBbpmZdwSu1c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getRandomPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
    } catch (error) {
        // Catch error here
    }
}

// On Load
getRandomPhotos();