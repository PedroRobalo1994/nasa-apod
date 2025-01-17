const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
const resultsNav = document.getElementById('resultsNav');
const saveConfirmed = document.querySelector('.save-confirmed');

const apiKey = 'DEMO_KEY';
const apiURl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
const count = 10;

let resultsArray = [];

async function getNasaPictures() {
    try {
        const response = await fetch(apiURl);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch (error) {
        console.log(error);
    }
}

function updateDOM() {
    resultsArray.forEach((result) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = result.hdurl;
        link.target = '_blank';
        link.title = 'View Full Image';

        const image = document.createElement('img');
        image.alt = 'NASA Picture of the Day';
        image.classList.add('card-img-top');
        image.loading = 'lazy';
        image.src = result.url;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;

        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add to Favorites';

        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;

        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        const date = document.createElement('strong');
        date.textContent = result.date;

        const copyrightResult = result.copyright === undefined ? 'Unknown' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;

        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

getNasaPictures();
