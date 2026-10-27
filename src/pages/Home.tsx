import { useRef, useEffect, useState, SubmitEvent } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from '../services/api';
import { Movie } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';
import { useDebounce } from "../hooks/useDebounce";

function Home() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [suggestions, setSuggestions] = useState<Movie[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const debouncedQuery = useDebounce(searchQuery, 400);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error(error);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        const fetchSuggestions = async () => {
            try {
                const results = await searchMovies(debouncedQuery, controller.signal);
                setSuggestions(results.slice(0, 6));
                setShowSuggestions(true);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") return;
                console.error("Failed to fetch suggestions:", err);
            }
        };

        fetchSuggestions();

        return () => controller.abort();
    }, [debouncedQuery])

    const handleSearch = async (e: SubmitEvent) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
        setShowSuggestions(false);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }

        setSearchQuery("");
        setSuggestions([]);
    };

    return (
        <>
            <div className="home">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <input
                            value={searchQuery}
                            ref={inputRef}
                            onChange={e => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            type="text"
                            placeholder="Search for movies..."
                            className="search-input"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="suggestions-dropdown">
                                {suggestions.map(movie => (
                                    <li key={movie.id} className="suggestion-item">
                                        <Link
                                            to={`/MovieDetails/${movie.id}`}
                                            className="suggestion-link"
                                            onClick={() => setShowSuggestions(false)}>
                                            
                                            <span className="suggestion-title">{movie.title}</span>
                                            {movie.release_date && (
                                                <span className="suggestion-year">
                                                    ({movie.release_date.split("-")[0]})
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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
        </>
    );
}

export default Home;