import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        axios.get("https://www.freetestapi.com/api/v1/movies")
            .then(res => setMoviesList(res.data))
            .catch(err => console.error("Error fetching movies:", err));
    }, []);

    return (
        <div className="container mt-5">
            {/* Navigation */}
            <div className="mb-4">
                <Link to="/" className="btn btn-secondary">🏠 Home</Link>
            </div>

            {/* Movies List */}
            <div className="row g-4">
                {moviesList.map((movie) => (
                    <div className="col-lg-4 col-md-6" key={movie.id}>
                        <div className="card movie-card shadow-sm border-0">
                            {/* Movie Poster */}
                            <img
                                src={movie.poster || "https://via.placeholder.com/300x450?text=No+Image"}
                                className="card-img-top movie-poster"
                                alt={movie.title}
                            />

                            {/* Movie Info */}
                            <div className="card-body">
                                <h5 className="card-title text-primary">{movie.title}</h5>
                                <p className="card-text"><strong>Genre:</strong> {movie.genre.join(", ")}</p>
                                <p className="card-text"><strong>Director:</strong> {movie.director}</p>
                                <p className="card-text">
                                    <strong>Actors:</strong> {movie.actors.slice(0, 3).join(", ")}{movie.actors.length > 3 ? "..." : ""}
                                </p>
                                <p className="card-text"><strong>Rating:</strong> ⭐ {movie.rating}</p>
                                <p className="card-text"><strong>Runtime:</strong> {movie.runtime} minutes</p>

                                {/* Buttons */}
                                <div className="d-flex justify-content-between">
                                    <a href={movie.website} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">🎬 Official Site</a>
                                    <a href={movie.trailer} className="btn btn-danger btn-sm" target="_blank" rel="noopener noreferrer">📺 Watch Trailer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
