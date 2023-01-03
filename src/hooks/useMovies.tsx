import React, {useEffect, useState} from 'react';
import {Movie, MoviesDbResponse} from '../../@types';
import movieDB from '../api/movieDB';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MoviesDbResponse>('/now_playing');
    const popularPromise = movieDB.get<MoviesDbResponse>('/popular');
    const topRatedPromise = movieDB.get<MoviesDbResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MoviesDbResponse>('/upcoming');

    const res = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: res[0].data.results,
      popular: res[1].data.results,
      topRated: res[2].data.results,
      upcoming: res[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};

export default useMovies;
