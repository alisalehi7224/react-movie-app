const BASE_URL = "https://react-movie-app-4nkl.onrender.com/api/movies";

export const getPopularMovies = async (signal) => {
    const response = await fetch(`${BASE_URL}/popular`, {signal});
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.results;
};


export const searchMovies = async (query, signal) => {
    const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`
    , {signal});
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.results;
};


export const getMovieDetails = async (id, signal) => {
    const response = await fetch(
        `${BASE_URL}/${id}`
    , {signal});
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data;
};


