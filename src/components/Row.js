import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import MovieModal from './MovieModal';

export default function Row({ title, fetchUrl, isLargeRow, id }) {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {    // 비동기 요청
    const request = await axios.get(fetchUrl);
    console.log('request', request);
    setMovies(request.data.results);    // 영화 정보들을 movies state에 넣어줌.
  }

  const handleClick = (movie) => {    // 클릭한 movie 정보를 가져옴
    setModalOpen(true);
    setMovieSelected(movie);    // movie 정보를 넣어줌
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}>
            {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
          {movies.map(movie => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}>
            {">"}
          </span>
        </div>
      </div>
      {
        modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />   // props로 movie 정보 넣어줌.
        )
      }
    </section>
  )
}
