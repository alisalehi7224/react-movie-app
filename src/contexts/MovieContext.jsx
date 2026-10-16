//this file acts as a state manager for our favorite movies

import { createContext, useState, useContext, useEffect } from "react";

const movieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(movieContext);


export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])



    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieID) => {
        setFavorites(prev => prev.filter((movie) => movie.id !== movieID));
    }

    const isFavorite = (movieID) => {
        return favorites.some(movie => movie.id === movieID);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <movieContext.Provider value={value}>
        {children}
    </movieContext.Provider>

}