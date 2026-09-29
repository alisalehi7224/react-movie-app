import "../css/Favorites.css"
import { useMovieContext } from '../contexts/MovieContext.jsx';
import MovieCard from "../components/MovieCard.jsx";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites.length > 0) {
        return (
            <div className={"favorites"}>
                <h2>Your Favorites</h2>
                <div className={
                    favorites.length>3
                     ? 
                     "movies-grid" 
                     : 
                     favorites.length>2 
                     ? 
                     "movies-grid-3" 
                     : 
                     favorites.length>1 
                     ?
                     "movies-grid-2" 
                     :
                    "movies-grid-1"}>
                    {favorites.map(movie =>
                        <MovieCard movie={movie} key={movie.id} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
    );
}




export default Favorites