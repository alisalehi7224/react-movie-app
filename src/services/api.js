const BASE_URL = "https://react-movie-app-4nkl.onrender.com/api/movies";

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


export const getMovieDetails = async (id) => {
    const response = await fetch(
        `${BASE_URL}/${id}`
    );
    const data = await response.json();
    return data;
};


