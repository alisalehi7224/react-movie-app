import {Movie} from '../contexts/MovieContext'
const BASE_URL = "https://react-movie-app-4nkl.onrender.com/api/movies";

export interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export const getPopularMovies = async (
    page: number = 1,
    signal?: AbortSignal
): Promise<TMDBResponse> => {
    const response = await fetch(
        `${BASE_URL}/popular?page=${page}`, 
        { signal });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data: TMDBResponse = await response.json();
    return data;
};

export const searchMovies = async (
    query: string, 
    page: number = 1,
    signal?: AbortSignal
): Promise<TMDBResponse> => {
    const response = await fetch(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}`, 
        { signal }
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data: TMDBResponse = await response.json();
    return data;
};

export const getMovieDetails = async (
    id: number, 
    signal?: AbortSignal
): Promise<Movie> => {
    const response = await fetch(
        `${BASE_URL}/${id}`, 
        { signal }
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data: Movie = await response.json();
    return data;
};