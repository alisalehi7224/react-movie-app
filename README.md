# 🎬 React Movie App

A full-stack movie browsing application built with React and a Node.js/Express backend. The app uses the TMDB API to provide popular movies and movie search functionality.

🌐 **Live Demo:** https://react-movie-app-ltkx.onrender.com/

## ✨ Features

- 🎬 Browse popular movies
- 🔍 Search for movies
- ❤️ Add movies to favorites
- 📱 Responsive design for desktop and mobile
- 🔄 Client-side routing with React Router
- 🔐 API requests handled through a backend server
- 🚀 Deployed frontend and backend

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- Axios
- dotenv

### API

- TMDB API

## 🏗️ Architecture

The application uses a separate frontend and backend.

```text
React Frontend
      │
      │ HTTP requests
      ▼
Node.js / Express Backend
      │
      │ API requests
      ▼
TMDB API
```

The frontend communicates with the application's backend rather than directly exposing the TMDB API credentials in the client-side code.

## 📂 Project Structure

```text
React Movie App/
│
├── backend/
│   └── server and backend-related files
│
├── public/
│   └── static public assets
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── css/
│   ├── pages/
│   └── services/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── eslint.config.js
```

### Frontend

The `src` directory contains the React application:

- **`components/`** — reusable UI components
- **`contexts/`** — React Context functionality
- **`css/`** — application styles
- **`pages/`** — page-level components
- **`services/`** — API and service-related logic
- **`assets/`** — frontend assets

### Backend

The `backend` directory contains the Node.js/Express server responsible for handling communication with TMDB and keeping the API credentials on the server side.

## 🔑 Environment Variables

The backend uses environment variables for sensitive configuration such as the TMDB API key.

Example:

```env
TMDB_API_KEY=your_api_key_here
```

Sensitive environment variables are not committed to the repository.

## 🚀 Deployment

The production application is deployed on Render.

The frontend and backend are deployed separately, with the frontend communicating with the deployed Express backend through API routes.

## 📚 Developer Version

A separate repository contains the original local-development version of the application, including instructions for setting it up and running it locally.

**Developer / Test Repository:**  
https://github.com/alisalehi7224/react-movie-app-dev

## 📄 License

This project was created for learning and development purposes.
