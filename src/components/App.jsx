import React from 'react';

import HomePage from '../pages/HomePage';
import MovieSearchPage from 'pages/MovieSearchPage';
import MovieDetail from '../pages/MovieDetailPage';
import Cast from '../pages/CastPage';
import Reviews from '../pages/ReviewsPage';
import Header from './Header/Header';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieSearchPage />} />

        <Route path="/movie/:movieId" element={<MovieDetail />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
}
