# NASA Astronomy Picture of the Day (APOD) Gallery

A dynamic web application that displays NASA's Astronomy Pictures of the Day, allowing users to browse through stunning space images and save their favorites locally.

## 🚀 Features

- Fetches multiple NASA APOD images using NASA's official API
- Responsive design that works on desktop and mobile devices
- Save favorite images locally
- View full-resolution images in a new tab
- Load more images on demand
- Toggle between favorites and new results
- Includes loading animation for better user experience

## 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- NASA APOD API
- LocalStorage for data persistence

## 🔧 Setup

1. Clone this repository
2. Replace the `DEMO_KEY` in script.js with your NASA API key
   - Get your API key from: https://api.nasa.gov/
3. Open `index.html` in your browser


## 📝 Usage

- Click "Load More" to fetch new images
- Click "Add to Favorites" to save an image
- Switch to "Favorites" to view saved images
- Click "Remove Favorite" to remove from favorites
- Click on any image to view full resolution version

## 🌟 API Reference

This project uses the [NASA APOD API](https://api.nasa.gov/). The API provides a new astronomy picture each day along with a brief explanation written by a professional astronomer.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (800px and above)
- Mobile devices (below 800px)
