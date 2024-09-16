import React, { useEffect, useState } from 'react';

export default function MovieImage({ movieId }) {
  const [image, setImage] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = '0e655845aa3ccf345c6e44b10218bf57';

    const fetchImage = async () => {
      try {
        const imagesUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&language=en-US&include_image_language=en`;

        const response = await fetch(imagesUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const imagesData = await response.json();
        if (imagesData.posters && imagesData.posters.length > 0) {
          setImage(imagesData.posters[0]); // Set the first image
        } else {
          setImage(null);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchImage();
  }, [movieId]);

  if (error) return <div>Error: {error.message}</div>;
  if (!image) return <div>No image available</div>;

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
        alt={image.language || 'Movie Image'}
        style={{ width: '200px', height: 'auto' }}
      />
    </div>
  );
}
