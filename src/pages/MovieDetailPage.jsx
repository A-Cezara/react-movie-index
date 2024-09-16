import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieImage from 'components/MovieImage';
import style from './MovieDetail.module.css';
import { Link, Outlet } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = '0e655845aa3ccf345c6e44b10218bf57';
    if (!apiKey) {
      setError(new Error('API key is missing'));
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

        const response = await fetch(movieUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const movieData = await response.json();
        setMovie(movieData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div>
      <div className={style.detailsContainer}>
        <MovieImage movieId={movieId} />
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
      </div>
      <div className={style.additionalInformation}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetails;
