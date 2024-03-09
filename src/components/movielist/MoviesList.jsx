import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoviesList.css';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [newMovieTitle, setNewMovieTitle] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const url = "https://api.themoviedb.org/3/discover/movie";
            const response = await axios.get(url, {
                params: {
                    api_key: 'e41d7d642aee784d9aadfab93c75b137',
                    'primary_release_date.gte': '2023-11-01',
                    'primary_release_date.lte': '2023-12-01',
                    page: 1
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddMovie = async () => {
        try {

            const newMovie = {
                id: Date.now(),
                title: newMovieTitle,
                overview: 'Lorem ipsum dolor sit amet.',
                release_date: '2023-12-31',
                poster_path: '/placeholder.jpg'
            };
            setMovies([...movies, newMovie]);
            setNewMovieTitle('');


            console.log('Movie added:', newMovie);
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    const handleDeleteMovie = (id) => {
        try {

            const updatedMovies = movies.filter(movie => movie.id !== id);
            setMovies(updatedMovies);


            console.log('Movie deleted:', id);
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div className="movie-list-container">
            <h1 className="movie-list-heading">Movie List</h1>
            <div className="crud-section">
                <input
                    type="text"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                    placeholder="Enter new movie title"
                />
                <button onClick={handleAddMovie}>Add Movie</button>
            </div>
            {error && <div className="error-message">Error: {error}</div>}
            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                        <h2 className="movie-title">{movie.title}</h2>
                        <p className="movie-release-date">Release Date: {movie.release_date}</p>
                        <p className="movie-overview">{movie.overview}</p>
                        <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
