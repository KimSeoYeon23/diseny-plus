import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 영화 리스트 가져옴
    const response = await axios.get(requests.fetchNowPlaying);
    // 자바스크립트로 랜덤 숫자 가져오기 Math.floor(Math.random() * max)
    // 영화 리스트 중 랜덤으로 하나의 ID 가져옴
    const movieId = response.data.results[Math.floor(Math.random() * response.data.results.length)].id;

    // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name || movie.original_name}</h1>
        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button className="banner__button play" onClick={() => setIsClicked(true)}>
              Play
            </button>
          )}
        </div>
        <p className="banner__description">{truncate(movie?.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
