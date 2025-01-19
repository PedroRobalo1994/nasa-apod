const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const apiKey = 'DEMO_KEY';
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let favorites = {};
let resultsArray = [];

/**
 * Updates the UI to show either results or favorites page
 * @param {string} page - The page to display ('results' or 'favorites')
 */
function showContent(page) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    loader.classList.add('hidden');
    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }
}

/**
 * Creates and appends DOM elements for each NASA picture
 * @param {string} page - The current page context ('results' or 'favorites')
 */
function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
    currentArray.forEach((result) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';

        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;

        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results') {
            saveText.textContent = 'Add To Favorites';
            saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
        } else {
            saveText.textContent = 'Remove Favorite';
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }

        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;

        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        const date = document.createElement('strong');
        date.textContent = result.date;

        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;

        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

/**
 * Updates the DOM with either results or favorites content
 * @param {string} page - The page to update ('results' or 'favorites')
 */
function updateDOM(page) {
    if (localStorage.getItem('nasaFavorites')) {
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
    showContent(page);
}

/**
 * Fetches NASA pictures from the API
 * Handles loading state and updates DOM with results
 * @async
 * @returns {Promise<void>}
 */
async function getNasaPictures() {
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM('results');
    } catch (error) {
        // Catch Error Here
        console.error('Error fetching NASA pictures:', error);
    }
}

/**
 * Saves a NASA picture to favorites
 * @param {string} itemUrl - The URL of the picture to save
 */
function saveFavorite(itemUrl) {
    resultsArray.forEach((item) => {
        if (!(item.url.includes(itemUrl) && !favorites[itemUrl])) {
            return;
        }
        favorites[itemUrl] = item;
        saveConfirmed.hidden = false;
        setTimeout(() => {
            saveConfirmed.hidden = true;
        }, 2000);
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    });
}

/**
 * Removes a picture from favorites
 * @param {string} itemUrl - The URL of the picture to remove
 */
function removeFavorite(itemUrl) {
    if (!favorites[itemUrl]) {
        return;
    }
    delete favorites[itemUrl];
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
}

// On Load
getNasaPictures();
