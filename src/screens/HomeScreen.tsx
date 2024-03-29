import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import MovieCard from '../components/movie-card';
import useMovies from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/horizontal-slider';
import GradientBackground from '../components/GradientBackground';
import {getColores} from '../helpers/getColores';
import {GradientContext} from '../context/GradientContext';

const {width: windowWith} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary = 'green', secondary = 'orage'] = await getColores(uri);
    setColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top + 20}}>
          <View style={{height: 440}}>
            <Carousel
              data={nowPlaying}
              renderItem={baseData => <MovieCard movie={baseData.item} />}
              sliderWidth={windowWith}
              itemWidth={300}
              vertical={false}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Peliculas Populares */}
          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Up Coming" movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
