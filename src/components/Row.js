import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";

export default function Row({ title, fetchUrl, isLargeRow, id }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {    // 비동기 요청
    const request = await axios.get(fetchUrl);
    console.log('request', request);
    setMovies(request.data.results);    // 영화 정보들을 movies state에 넣어줌.
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'>{"<"}</span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map(movie => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'>{">"}</span>
        </div>
      </div>
    </section>
  )
}
