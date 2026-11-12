import { useRef, useEffect, useState, SubmitEvent } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from '../services/api';
import { Movie } from '../contexts/MovieContext';
import { Link } from 'react-router-dom';
import { useDebounce } from "../hooks/useDebounce";

function Home() {
    const inputRef = useRef<HTMLInputElement>(null)
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Input State (Drives the search bar and dropdown suggestions)
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 200);
    const [suggestions, setSuggestions] = useState<Movie[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Active mode state (Drives the main movie grid & pagination)
    const [activeQuery, setActiveQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    // Unified reactive fetch: Automatically runs when activeQuery or currentPage changes
    useEffect(() => {
        const controller = new AbortController();

        const fetchMainGrid = async () => {
            setLoading(true);
            setError(null);

            try {
                // If there's an active query, fetch search results. Otherwise, fetch popular movies.
                const data = activeQuery.trim()
                    ? await searchMovies(activeQuery, currentPage, controller.signal)
                    : await getPopularMovies(currentPage, controller.signal);

                setMovies(data.results);
                // TMDB hard limit: never allow pagination past page 500
                setTotalPages(Math.min(data.total_pages, 500));
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") return;
                console.error(err);
                setError("Failed to load movies...");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchMainGrid();
        return () => controller.abort();
    }, [activeQuery, currentPage]);

    // Suggestions Effect
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        const fetchSuggestions = async () => {
            try {
                const data = await searchMovies(debouncedQuery, 1, controller.signal);
                setSuggestions(data.results.slice(0, 6));
                setShowSuggestions(true);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") return;
                console.error("Failed to fetch suggestions:", err);
            }
        };

        fetchSuggestions();

        return () => controller.abort();
    }, [debouncedQuery]);

    // Click outside listener for suggestions
    useEffect(() => {
        if (!showSuggestions) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (
                searchContainerRef.current &&
                target &&
                !searchContainerRef.current.contains(target)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [showSuggestions]);

    // Lightweight event handlers
    const handleSearch = (e: SubmitEvent) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        setActiveQuery(searchQuery);
        setCurrentPage(1);

        setShowSuggestions(false);
        setSearchQuery("");
        setSuggestions([]);
    };

    // Unified pagination handler
    const handlePageChange = (newPage: number) => {
        if (loading || newPage < 1 || newPage > totalPages || newPage === currentPage) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <div ref={searchContainerRef} className="search-input-wrapper">
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

            {/* Clear search button */}
            {activeQuery && !loading && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Search Results for "{activeQuery}"</h2>
                    <button
                        className="search-button"
                        onClick={() => { setActiveQuery(""); setCurrentPage(1); }}
                    >
                        Clear Search
                    </button>
                </div>
            )}


            {error &&
                <div className="error-message">
                    {error}
                </div>}


            {loading && movies.length === 0 ? (
                <div className="loading">Loading...</div>
            ) : movies.length === 0 ? (
                <div className="no-results">No results were found.</div>
            ) : (
                <div
                    className={`${movies.length > 2
                            ? "movies-grid"
                            : movies.length > 1
                            ? "movies-grid-2"
                            : "movies-grid-1"
                        } ${loading ? "grid-loading" : ""}`}
                >
                    {movies.map(movie =>
                        <MovieCard movie={movie} key={movie.id} />)}
                </div>
            )}

            {/* Pagination controls */}
            {!loading && movies.length > 0 && totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || loading}
                        className="pagination-btn"
                    >
                        &larr; Prev
                    </button>
                    <span className="pagination-info">
                        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className="pagination-btn"
                    >
                        Next &rarr;
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;