import MovieCard from "../components/MovieCard"
import "../css/Home.css"
import { useEffect, useState } from "react"
import { searchMovies, getPopularMovies, getMovieDetails } from '../services/api.js'

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error(error);
                setError("Failed to load movies...")
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies()
        
    }, [])



    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
        
        setSearchQuery("");
    }

    

    
    return (<>
        <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search for movies..." className="search-input">
                </input>

                <button className="search-button" type="submit">
                    Search
                </button>
            </form>

            {error && 
            <div className="error-message">
                {error}
            </div>}

            {loading ?
                <div className="loading">
                    Loading...
                </div>
                :
                movies.length === 0 ?
                    <div className="no-results">No results were found. Refresh to load popular movies...</div>
                    :
                    <div className={movies.length > 2 ? "movies-grid" : movies.length > 1 ? "movies-grid-2" : "movies-grid-1"}>
                        {movies.map(movie =>
                            <MovieCard movie={movie} key={movie.id} />)}
                    </div>}
        </div>
    </>)
}

export default Home;

