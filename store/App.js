import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Expo Font
import { useFonts } from 'expo-font';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './src/navigation/RootNav';
// Redux
import { Provider } from 'react-redux';
import { store } from './src/redux/store';


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function App() {

  const [fontsLoaded] = useFonts({
    'RH-Bold': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Bold.ttf'), 
    'RH-Black': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Black.ttf'), 
    'RH-ExtraBold': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-ExtraBold.ttf'), 
    'RH-Regular': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Regular.ttf'), 
    'RH-Light': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Light.ttf'), 
    'RH-Medium': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-Medium.ttf'), 
    'RH-SemiBold': require('./assets/fonts/Red_Hat_Display/static/RedHatDisplay-SemiBold.ttf'), 
  });

  if (!fontsLoaded) {
    return null;
  }

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Return Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
return (
  <Provider store={store}>
    <NavigationContainer>
      <RootNav />
    </NavigationContainer>
  </Provider>
);
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Style Section
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
