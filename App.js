import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import MultiplayerSetup from './src/screens/MultiplayerSetup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Buscaminas' }}
        />
        <Stack.Screen 
          name="MultiplayerSetup" 
          component={MultiplayerSetup} 
          options={{ title: 'Multijugador' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
