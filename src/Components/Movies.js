import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Movies() {
    const imgStyles = {
        margin:'10px',
        height: '260px',
        objectFit: 'cover',
        width: '100%',
        borderRadius: '2px 2px 0 0',
        marginBottom: '10px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        padding: '10px',
        backgroundColor: 'orange'
    };
    

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [movieRatings, setMovieRatings] = useState({});



  useEffect(() => {
    const apiKey = 'b8c4ff6c82614ebcb06e01dc8de08551';
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(response => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results); 
      })
      .catch(error => console.error('Error:', error));
  }, []);

  function searchMovieTitle() {
    let moviesFiltered = movies.filter((item) => item['title'].toLowerCase().includes(search.toLowerCase()));
    setFilteredMovies(moviesFiltered);
  }

  function handleSearch(e) {
    e.preventDefault();
    searchMovieTitle();
  }

  function handleChange(e) {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setFilteredMovies(movies);
    }
  };

  const handleAddToFavorites = (movieId) => {
    const movieToAdd = filteredMovies.find((movie) => movie.id === movieId);
    if (movieToAdd) {
      const isFavorite = favorites.some((movie) => movie.id === movieId);
      if (isFavorite) {
        setFavorites(favorites.filter((movie) => movie.id !== movieId));
      } else {
        setFavorites([...favorites, movieToAdd]);
      }
    }
  };

  const handleRateMovie = (movieId, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating,
    }));
  };
  

  const handleWatchTrailer = (movieId) => {
    const apiKey = 'b8c4ff6c82614ebcb06e01dc8de08551';
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
      .then(response => {
        const videos = response.data.results;
        if (videos.length > 0) {
          const trailerId = videos[0].key;
          window.open(`https://www.youtube.com/watch?v=${trailerId}`, '_blank');
        } else {
          console.log('No se encontró el trailer de la película.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (

    <div className="container p-3">
      <form onSubmit={handleSearch}>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <input type="text" className="form-control" placeholder="Buscar Pelicula" onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">Buscar</button>
          </div>
        </div>
      </form>

      <br />

     <hr />
     <h2 className="text-center">Películas Favoritas</h2>
     <hr />
      <div className="row">
        {favorites.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <div>
              <div className="movie-item" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={imgStyles} />
                <div className="card-body text-center">
                  <h5>{movie.title}</h5>
                  <p>{movie.description}</p>
                  <p>Año: {movie.release_date}</p>
                  <button className="btn btn-primary" onClick={() => handleWatchTrailer(movie.id)}>Ver Trailer</button>
                  <button className="btn btn-danger btn-margin" onClick={() => handleAddToFavorites(movie.id)}>Eliminar de Favoritos</button>
                  <div>
                    <p>Calificación: {movieRatings[movie.id] || 'N/A'}</p>
                    <div>
                      <div>
                        <button className="btn btn-sm btn-success" onClick={() => handleRateMovie(movie.id, 5)}>5</button>{" "}
                        <button className="btn btn-sm btn-success" onClick={() => handleRateMovie(movie.id, 4)}>4</button>{" "}
                        <button className="btn btn-sm btn-success" onClick={() => handleRateMovie(movie.id, 3)}>3</button>{" "}
                        <button className="btn btn-sm btn-success" onClick={() => handleRateMovie(movie.id, 2)}>2</button>{" "}
                        <button className="btn btn-sm btn-success" onClick={() => handleRateMovie(movie.id, 1)}>1</button>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <hr />
      <h1 className="text-center">Lista de Peliculas</h1>
      <hr />
      <div className="row">
        {filteredMovies.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <div>
              <div className="movie-item" key={movie.id} >
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={imgStyles} />
                <div className="card-body text-center">
                  <h5>{movie.title}</h5>
                  <p>{movie.description}</p>
                  <p>Año: {movie.release_date}</p>
                  <button className="btn btn-primary" onClick={() => handleWatchTrailer(movie.id)}>Ver Trailer</button>
                  <button className="btn btn-success btn-margin" onClick={() => handleAddToFavorites(movie.id)}>Agregar a Favorito!</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;