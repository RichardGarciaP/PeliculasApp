import React, {useEffect, useState} from 'react';
import {Movie, MoviesDbNowPlaying} from '../../@types';
import movieDB from '../api/movieDB';

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [actualMovies, setActualMovies] = useState<Movie[]>([]);

  const getMovies = async () => {
    const res = await movieDB.get<MoviesDbNowPlaying>('/now_playing');
    const movies = res.data.results;

    setActualMovies(movies);

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    actualMovies,
    isLoading,
  };
};

export default useMovies;
