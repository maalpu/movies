import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { get } from '../utils/httpClient';
import styles from '../components/css/MovieDetails.module.css';
import { Spinner } from '../components/Spinner';
import { getMovieImg } from '../utils/getMovieImg';

export function MovieDetails() {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);

      get("/movie/" + movieId).then((data) => {
        setMovie(data);
        setIsLoading(false);
      });
    }, [movieId]);

    if(isLoading) {
      return <Spinner />
    }
  
    if (!movie) {
      return null;
    }
  
    const imageUrl = getMovieImg(movie.poster_path, 500);
    return (
      <div className={styles.detailsContainer}>
        <img
          className={`${styles.col} ${styles.movieImage}`}
          src={imageUrl}
          alt={movie.title}
        />
        <div className={`${styles.col} ${styles.movieDetails}`}>
          <p className={styles.firstItem}>
            <strong>Title: </strong> {movie.title}
          </p>
          <p>
            <strong>Genres: </strong>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Description: </strong> {movie.overview}
          </p>
          <p>
            <strong>Release-Date: </strong> {movie.release_date}
          </p>
          <p>
            <strong>Popularity: </strong> {movie.popularity}
          </p>
          <p>
            <strong>Vote-Count: </strong> {movie.vote_count}
          </p>
          <p>
            <strong>Original-Language: </strong> {movie.original_language}
          </p>
       </div>
      </div>
    );
  }
