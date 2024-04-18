import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import requests from '../api/requests';
import "./Banner.css"

export default function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {   // 비동기 요청
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)  
    const request = await axios.get(requests.fetchNowPlaying);
    console.log(request)

    // 여러 영화 중 영화 하나의 ID 가져오기(랜덤으로)
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, { // response가 movieDetail 안에 다 들어가도록
      params: { append_to_response: "videos" },   // 받아오는 response에 비디오도 같이 넣어서 전달해달라고 요청
    })
    console.log('movieDetail', movieDetail)
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {  // 비디오에 대한 설명글이 100자 이상일 경우, 자른 후 ... 붙이기
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
        <div className='banner__buttons'>
          <button className='banner__button play'>Play</button>
          <button className='banner__button info'>More Information</button>
        </div>
        <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
  )
}
