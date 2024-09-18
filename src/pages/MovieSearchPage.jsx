import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SearchForm from 'components/SearchForm/SearchForm';

const apiKey = '0e655845aa3ccf345c6e44b10218bf57';

export default function MovieSearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  const fetchMovies = async query => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = query => {
    // Update the URL with the search query and fetch movies
    navigate(`/movies?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearchSubmit} placeholder="Search movies" />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title || movie.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
