import { NeonTimer } from '@/components/NeonTimer';
import Icon from '@/components/ui/Icon';
import { useTimer } from '@/context/TimerContext';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TimerScreen() {
  const { id } = useLocalSearchParams();
  const { state, dispatch } = useTimer();

  useEffect(() => {
    const timer = state.timers.find((t) => t.id === id);
    if (timer) {
      dispatch({ type: 'SET_CURRENT_TIMER', payload: timer });
    } else {
      router.back();
    }

    return () => {
      dispatch({ type: 'PAUSE_TIMER' });
      dispatch({ type: 'RESET_TIMER' });
      dispatch({ type: 'SET_CURRENT_TIMER', payload: null });
    };
  }, [id]);

  if (!state.currentTimer) return null;

  const handleStartPause = () => {
    if (state.isRunning) {
      dispatch({ type: 'PAUSE_TIMER' });
    } else {
      dispatch({ type: 'START_TIMER' });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_TIMER' });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'relative',
        }}
      >
        <TouchableOpacity
          style={{ position: 'absolute', left: 10, padding: 20 }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#fff' }}>
            <Icon icon={faArrowLeft} color='#fff' />
          </Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>{state.currentTimer.name}</Text>
          <Text style={styles.roundText}>
            Tour {state.currentRound} sur {state.currentTimer.rounds}
          </Text>
        </View>
      </View>

      <View style={styles.timerContainer}>
        <NeonTimer
          time={state.remainingTime}
          totalTime={
            state.isResting
              ? state.currentTimer.restTime
              : state.currentTimer.workTime
          }
        />
        <Text style={styles.phaseText}>
          {state.isResting ? 'Repos' : 'Effort'}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Réinitialiser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={handleStartPause}
        >
          <Text style={styles.buttonText}>
            {state.isRunning ? 'Pause' : 'Démarrer'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  roundText: {
    fontSize: 16,
    color: '#888',
  },
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 24,
    color: '#fff',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#333',
  },
  startButton: {
    backgroundColor: '#00ffff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
