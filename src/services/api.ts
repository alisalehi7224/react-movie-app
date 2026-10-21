import {Movie} from '../contexts/MovieContext'
const BASE_URL = "https://react-movie-app-4nkl.onrender.com/api/movies";

export const getPopularMovies = async (signal?: AbortSignal): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/popular`, { signal });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query: string, signal?: AbortSignal): Promise<Movie[]> => {
    const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`, 
        { signal }
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (id: number, signal?: AbortSignal): Promise<Movie> => {
    const response = await fetch(
        `${BASE_URL}/${id}`, 
        { signal }
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data;
};

