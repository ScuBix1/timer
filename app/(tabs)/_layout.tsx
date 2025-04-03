import Icon from '@/components/ui/Icon';
import { Colors } from '@/constants/Colors';
import { faHome, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

export default function NavBar() {
  const theme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[theme ?? 'light'].tint,
          headerShown: true,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          tabBarLabelStyle: {
            fontSize: 14,
            color:
              theme === 'dark'
                ? DarkTheme.colors.text
                : DefaultTheme.colors.text,
            fontWeight: 'bold',
            fontFamily: 'SpaceMono',
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Accueil',
            tabBarIcon: () => {
              return (
                <Icon
                  icon={faHome}
                  size={25}
                  color={
                    theme !== 'dark'
                      ? DefaultTheme.colors.text
                      : DarkTheme.colors.text
                  }
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name='chrono/index'
          options={{
            title: 'Chronomètre',
            tabBarIcon: () => {
              return (
                <Icon
                  icon={faStopwatch}
                  size={25}
                  color={
                    theme !== 'dark'
                      ? DefaultTheme.colors.text
                      : DarkTheme.colors.text
                  }
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
}
