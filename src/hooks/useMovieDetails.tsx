import {useEffect, useState} from 'react';
import {Cast, CreditsResponse, MovieFull} from '../../@types';
import movieDB from '../api/movieDB';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number): MovieDetails => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailPromise = movieDB.get<MovieFull>(`${movieId}`);
    const castPromise = movieDB.get<CreditsResponse>(`${movieId}/credits`);

    const [movieDetailResponse, castResponse] = await Promise.all([
      movieDetailPromise,
      castPromise,
    ]);

    setState({
      isLoading: false,
      movieFull: movieDetailResponse.data,
      cast: castResponse.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();

    return () => {};
  }, []);

  return {
    ...state,
  };
};
