import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIKey } from "../../config/key";
import { imagePath } from "../../config/imagePath";
import { Container } from "./styles";

// import { Container } from './styles';

function Details() {
  const { id } = useParams();

  const URL = `
  https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US`;

  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const { title, poster_path, overview, release_date } = data;

        const movie = {
          id,
          title: title,
          sinopse: overview,
          image: `${imagePath}${poster_path}`,
          release_date: release_date,
        };

        setMovie(movie);
      });
  }, [id]);

  return (
    <Container>
      <div className="movie">
        <img src={movie.image} alt={movie.sinopse} />
        <div className="details">
          <h1>{movie.title}</h1>
          <span>Sinopse: {movie.sinopse}</span>
          <span className="release-date">
            Release date: {movie.release_date}
          </span>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Details;
