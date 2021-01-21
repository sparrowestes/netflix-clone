import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          //http:www.youtube.com/watch?v=XtMthy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}={" "}
      <header
        className='banner-container'
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className='banner-content'>
          <h1 className='banner-title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className='banner-buttons'>
            <button
              className='banner-button'
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button className='banner-button'>My List</button>
          </div>
          <h1 className='banner-description'>
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className='banner-fadeBottom'></div>
      </header>
    </div>
  );
}

export default Banner;
