const BASE_URL = "http://localhost:3000/api/movies";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/popular`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();
    return data.results;
};