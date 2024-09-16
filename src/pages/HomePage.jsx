import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const apiKey = '0e655845aa3ccf345c6e44b10218bf57';

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data && data.results) {
          setMovies(data.results);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, [apiKey]);

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map(item => (
          <li key={item.id}>
            <Link to={`/movie/${item.id}`}>{item.title || item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
