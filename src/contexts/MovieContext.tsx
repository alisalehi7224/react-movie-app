import { createContext, useState, useContext, useEffect, ReactNode } from "react";

export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    release_date: string;
    vote_average: number;
    runtime?: number;
    overview: string;
    genres?: { id: number; name: string }[];
    original_language?: string;
};

type MovieContextType = {
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieID: number) => void;
    isFavorite: (movieID: number) => boolean;
};

const movieContext = createContext<MovieContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => {
    const context = useContext(movieContext);
    if (!context) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
};

export const MovieProvider = ({ children }: { children: ReactNode }) => {
    
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie: Movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    const removeFromFavorites = (movieID: number) => {
        setFavorites(prev => prev.filter((movie) => movie.id !== movieID));
    };

    const isFavorite = (movieID: number) => {
        return favorites.some(movie => movie.id === movieID);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        <movieContext.Provider value={value}>
            {children}
        </movieContext.Provider>
    );
};