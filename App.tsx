import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { RootStackParamList } from './types/navigation';
import LoginScreen from './src/screens/LoginScreen';
import FeedScreen from './src/screens/FeedScreen';
import PostScreen from './src/screens/PostScreen';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Prevent native splash screen from autohiding before hideAsync() is called
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): React.ReactElement {
  const [appIsReady, setAppIsReady] = useState(false);
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        console.log('Loading fonts...');
        await Font.loadAsync({
          'Syne-Bold': require('./src/assets/fonts/Syne-Bold.ttf'),
          'Syne-Regular': require('./src/assets/fonts/Syne-Regular.ttf'),
          'Syne-SemiBold': require('./src/assets/fonts/Syne-SemiBold.ttf'),
        });
      } catch (error) {
        console.error(error);
      } finally {
        // Tell the application to render
        console.log('Fonts loaded, app is ready to render.')
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerTitleAlign: "center",       
          headerTitleStyle: {
            fontFamily: "Syne-SemiBold",
            fontSize: 25,
          }}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Feed" component={FeedScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

