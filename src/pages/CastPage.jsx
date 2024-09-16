import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './CastPage.module.css';

export default function Cast() {
  const { movieId } = useParams(); // Get movieId from URL params
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = '0e655845aa3ccf345c6e44b10218bf57';

    const fetchCast = async () => {
      try {
        const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US&include_image_language=en`;

        const response = await fetch(castUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const movieData = await response.json();
        setCast(movieData.cast); // Set the cast data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';

  return (
    <div>
      <h2>Cast</h2>
      <div className={style.castGrid}>
        {cast &&
          cast.map(actor => (
            <div key={actor.cast_id} className={style.castItem}>
              {actor.profile_path ? (
                <img
                  src={`${imageBaseUrl}${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div className={style.noImage}>No Image</div>
              )}
              <p>
                {actor.name} as {actor.character}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
