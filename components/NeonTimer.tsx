import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface NeonTimerProps {
  time: number;
  totalTime: number;
}

const { width } = Dimensions.get('window');

export const NeonTimer: React.FC<NeonTimerProps> = ({ time, totalTime }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const progress = (time / totalTime) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000', '#1a1a1a']} style={styles.background}>
        <View style={styles.neonRing}>
          <LinearGradient
            colors={['#00ffff', '#0088ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.neonGradient, { width: `${progress}%` }]}
          />
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  neonRing: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    borderWidth: 4,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  neonGradient: {
    position: 'absolute',
    height: '100%',
    left: 0,
    opacity: 0.3,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
