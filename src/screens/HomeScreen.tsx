import React from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MovieCard from '../components/movie-card';
import useMovies from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/horizontal-slider';

const {width: windowWith} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();

  const {top} = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
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
          />
        </View>

        {/* Peliculas Populares */}
        <HorizontalSlider title="Popular" movies={popular} />
        <HorizontalSlider title="Top Rated" movies={topRated} />
        <HorizontalSlider title="Up Coming" movies={upcoming} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
