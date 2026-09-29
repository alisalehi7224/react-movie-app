//this file acts as a state manager for our favorite movies

import { createContext, useState, useContext, useEffect } from "react";

const movieContext = createContext();

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
        const newFavs = favorites.filter((movie) => movie.id !== movieID)
        setFavorites(newFavs);
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

