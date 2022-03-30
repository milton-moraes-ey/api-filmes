import React, { useState, useEffect } from "react";
import { Container, MovieList, Movie } from "./styles";
import { APIKey } from "../../config/key";
import { Link } from "react-router-dom";
import { imagePath } from "../../config/imagePath";

function Home() {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //consumir a API
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <Container>
      <h1>Movies</h1>
      <MovieList>
        {movies.map((movie) => {
          return (
            <Movie key={movie.id}>
              <Link to={`/details/${movie.id}`}>
                <img
                  src={`${imagePath}${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <span>{movie.title}</span>
            </Movie>
          );
        })}
      </MovieList>
    </Container>
  );
}

export default Home;
