import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Movie} from '../../@types';
import MovieCard from './movie-card';

interface Props {
  title?: string;
  movies: Movie[];
}

const HorizontalSlider = ({title, movies}: Props) => {
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text style={{fontSize: 30, marginHorizontal: 10, fontWeight: 'bold'}}>
          {title}
        </Text>
      )}
      <FlatList
        data={movies}
        renderItem={baseData => (
          <MovieCard movie={baseData.item} height={200} width={140} />
        )}
        keyExtractor={(item, index) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalSlider;
