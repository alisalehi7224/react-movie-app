import { MouseEvent, memo } from "react";
import "../css/MovieCard.css";
import { useMovieContext, Movie } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';

function MovieCard({ movie }: { movie: Movie }) {
    const { addToFavorites, isFavorite, removeFromFavorites } = useMovieContext();

    const favorite = isFavorite(movie.id);
    function onFavoriteClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();
        if (!favorite) {
            addToFavorites(movie);
        } else { 
            removeFromFavorites(movie.id); 
        }
    }

    const imageURL = `https://www.themoviedb.org/t/p/w342/${movie.poster_path}`;
    
    return (
        <div className="movie-card-wrapper">
            <Link to={`/MovieDetails/${movie.id}`} className="movie-card">
                <div className="movie-poster">
                    <img src={imageURL} alt={movie.title} />
                    <div className="movie-overlay">
                        <button
                            className={favorite ? "favorite-btn active" : "favorite-btn"}
                            onClick={onFavoriteClick}
                        >
                            ❤︎
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date.slice(0, 4)}</p>
                </div>
            </Link>
        </div>
    );
}

export default memo(MovieCard);