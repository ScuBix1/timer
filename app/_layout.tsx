import { ExerciseProvider } from '@/context/ExerciseContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { TimerProvider } from '../context/TimerContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ExerciseProvider>
        <TimerProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#000',
              },
              headerShown: false,
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              navigationBarHidden: true,
              statusBarHidden: true,
            }}
          />
          <StatusBar style='auto' />
        </TimerProvider>
      </ExerciseProvider>
    </ThemeProvider>
  );
}
