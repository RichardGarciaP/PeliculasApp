import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Movie} from '../../@types';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
};

const Stack = createStackNavigator<RootStackParams>();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="DetailScreen"
        // options={{cardStyle: {backgroundColor: 'red'}}}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
