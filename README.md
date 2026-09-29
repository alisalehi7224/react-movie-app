# React Movie App

A movie browsing application built with React and Vite using the TMDB API.

## Features

- Display popular movies from TMDB
- Search for movies by title
- Add movies to a favorites list
- Remove movies from favorites
- Favorites persist in the browser using `localStorage`
- Separate Home and Favorites pages
- Client-side routing with React Router
- Loading, error, and empty-result states
- Reusable movie card and navigation components
- Responsive movie grid layouts

## Technologies Used

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- TMDB API
- Browser `localStorage`

## Project Structure

```text
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── MovieCard.jsx
│   └── NavBar.jsx
├── contexts/
│   └── MovieContext.jsx
├── css/
│   ├── App.css
│   ├── Favorites.css
│   ├── Home.css
│   ├── index.css
│   ├── MovieCard.css
│   └── Navbar.css
├── pages/
│   ├── Favorites.jsx
│   └── Home.jsx
└── services/
    └── api.js
```

## How to Use

### 1. Clone or download the project

Clone the repository from GitHub:

```bash
git clone https://github.com/alisalehi7224/react-movie-app.git
```

Then enter the project directory:

```bash
cd react-movie-app
```

### 2. Install Node.js

Make sure Node.js is installed on your computer.

You can check whether Node.js and npm are installed with:

```bash
node --version
npm --version
```

### 3. Install the project dependencies

Run:

```bash
npm install
```

This installs the dependencies and development dependencies listed in `package.json`, including:

- React
- React DOM
- React Router DOM
- Vite
- ESLint and its related packages

You do **not** need to install `react-router-dom` separately. It is already included in `package.json`, so `npm install` installs it automatically.

### 4. Get a TMDB API key

This application uses the TMDB API to retrieve movie information.

To get an API key:

1. Create and log in to a TMDB account.
2. Open your account settings.
3. Go to the **API** section.
4. Follow TMDB's API registration process.
5. Obtain your API key.

See TMDB's official API documentation for the current registration and authentication process.

### 5. Add your API key

Open:

```text
src/services/api.js
```

Find:

```javascript
const API_KEY = "YourAPIKeyGoesHere";
```

Replace the placeholder with your own TMDB API key:

```javascript
const API_KEY = "YOUR_API_KEY";
```

The application uses TMDB's v3 `api_key` query-parameter authentication.

### 6. Start the development server

Run:

```bash
npm run dev
```

Vite will start the development server and display a local address in the terminal.

Open that address in your browser to use the application.

## Available npm Commands

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## How Favorites Work

Favorites are managed using React Context through `MovieContext`.

When a movie is added to favorites, the movie data is stored in React state. The favorites are also saved to `localStorage`, allowing them to remain available after refreshing or reopening the application in the same browser.

## API

The application currently uses two TMDB endpoints:

- Popular movies
- Movie search

Search queries are URL-encoded before being sent to the API.

## Important Note About the API Key

The API key placeholder is intentionally included in the repository instead of a real API key.

Because this application is a client-side React application, an API key used directly in the frontend can be visible to users of a deployed application. The placeholder in this repository prevents the developer's personal API key from being published in the source code.

For a production application, a backend or other appropriate server-side architecture should be considered for API credentials.

## TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

Please follow TMDB's current attribution, API, and usage requirements when using this project or deploying a modified version.

## Learning Purpose

This project was created as a React learning/practice project and focuses on:

- React components
- Props
- State
- `useEffect`
- React Context
- Event handling
- Conditional rendering
- Rendering lists with `.map()`
- React Router
- API requests with `fetch`
- Async/await
- Browser `localStorage`
- CSS organization
- Building a multi-page-feeling React application with client-side routing