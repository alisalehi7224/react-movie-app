import { useMovieContext } from '../contexts/MovieContext.jsx';
import "../css/MovieDetails.css"
import { getMovieDetails } from '../services/api.js'
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react'


function MovieDetails() {


    const {ID} = useParams()
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
        async function loadMovie() {
            const data = await getMovieDetails(ID);
            setMovie(data);
        }
        loadMovie();
    }, [ID]);

    const { addToFavorites, isFavorite, removeFromFavorites } = useMovieContext();

    if (!movie) return <p>Loading...</p>;
    
    const favorite = isFavorite(movie.id);
    function onFavoriteClick(e) {
        e.preventDefault();
        if (!favorite) {
            addToFavorites(movie)
        }
        else { removeFromFavorites(movie.id) }
    }
    



    const posterURL = `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`;
    const backdropURL = `https://www.themoviedb.org/t/p/w780/${movie.backdrop_path}`;

    return (
        <>
            <div className="movie-details">
                <div className="details-hero">
                    <div className="details-hero-img" style={{ backgroundImage: `url(${backdropURL})` }} />
                </div>

                <div className="details-content">
                    <img className="details-poster" src={posterURL} alt={movie.title} />

                    <div className="details-info">
                        <div className="details-header">
                            <h1 className="details-title">{movie.title}</h1>
                            <button className={isFavorite(movie.id) ? "details-fav-btn active" : "details-fav-btn"} onClick={onFavoriteClick}>
                                ❤︎ 
                            </button>
                        </div>

                        <div className="details-genres">
                            {movie.genres.map(g => <span className="genre-pill" key={g.id}>{g.name}</span>)}
                        </div>

                        <div className="details-stats">
                            <div className="stat-card"><span className="stat-label">Rating ⭐</span><span className="stat-value">{movie.vote_average.toFixed(1)} / 10</span></div>
                            <div className="stat-card"><span className="stat-label">Runtime</span><span className="stat-value">{`${Math.floor(movie.runtime/60)}H ${movie.runtime%60}M`}</span></div>
                            <div className="stat-card"><span className="stat-label">Released</span><span className="stat-value">{movie.release_date.slice(0, 4)}</span></div>
                            <div className="stat-card"><span className="stat-label">Language</span><span className="stat-value">{movie.original_language.toUpperCase()}</span></div>
                        </div>

                        <p className="details-overview">{movie.overview}</p>
                    </div>
                </div>
            </div>
        </>
    )


}

export default MovieDetails;