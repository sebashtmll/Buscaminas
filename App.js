import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import GameScreen from './src/screens/GameScreen';
import HomeScreen from './src/screens/HomeScreen';
import MultiplayerSetup from './src/screens/MultiplayerSetup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Buscaminas' }}
        />
        <Stack.Screen 
          name="GameScreen" 
          component={GameScreen} 
          options={{ title: 'Partida' }}
        />
        <Stack.Screen 
          name="MultiplayerSetup" 
          component={MultiplayerSetup} 
          options={{ title: 'Configuración Multijugador' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
