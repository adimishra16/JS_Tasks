import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary fw-bold">🎬 Movie Collection</h2>
                <Link to="/" className="btn btn-dark">🏠 Home</Link>
            </div>

            {/* Movies List */}
            <div className="row g-4">
                {moviesList.map((movie) => (
                    <div className="col-lg-4 col-md-6" key={movie.id}>
                        <div className="card movie-card shadow-sm border-0 h-100">
                            {/* Movie Poster */}
                            <img
                                src={movie.poster && movie.poster.startsWith("http") ? movie.poster : "https://via.placeholder.com/300x450?text=No+Image"}
                                className="card-img-top rounded-top"
                                alt={movie.title}
                                onError={(e) => e.target.src = "https://via.placeholder.com/300x450?text=No+Image"}
                                style={{ height: "350px", objectFit: "cover" }}
                            />

                            {/* Movie Info */}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-primary">{movie.title}</h5>
                                <p className="text-muted"><strong>Genre:</strong> {movie.genre.join(", ")}</p>
                                <p className="mb-1"><strong>Director:</strong> {movie.director}</p>
                                <p className="mb-1"><strong>Actors:</strong> {movie.actors.slice(0, 3).join(", ")}{movie.actors.length > 3 ? "..." : ""}</p>
                                <p className="mb-1"><strong>Rating:</strong> ⭐ {movie.rating} / 10</p>
                                <p className="mb-3"><strong>Runtime:</strong> {movie.runtime} minutes</p>

                                {/* Buttons */}
                                <div className="mt-auto d-flex justify-content-between">
                                    <a href={movie.website} className="btn btn-primary btn-sm me-2" target="_blank" rel="noopener noreferrer">🎬 Official Site</a>
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
