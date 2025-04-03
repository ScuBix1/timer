import Icon from '@/components/ui/Icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTimer } from '../context/TimerContext';
import { Timer } from '../types/timer';

export default function CreateTimerScreen() {
  const { dispatch } = useTimer();
  const [name, setName] = useState('');
  const [workTime, setWorkTime] = useState('30');
  const [restTime, setRestTime] = useState('15');
  const [rounds, setRounds] = useState('3');

  const handleCreateTimer = () => {
    if (!name || !workTime || !restTime || !rounds) return;

    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      workTime: parseInt(workTime),
      restTime: parseInt(restTime),
      rounds: parseInt(rounds),
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 30 }}>
          <Text style={{ color: '#fff' }}>
            <Icon icon={faArrowLeft} color='#fff' />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nom du timer</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder='Entrez un nom'
          placeholderTextColor='#666'
        />

        <Text style={styles.label}>Temps d'effort (secondes)</Text>
        <TextInput
          style={styles.input}
          value={workTime}
          onChangeText={setWorkTime}
          keyboardType='numeric'
          placeholder='30'
          placeholderTextColor='#666'
        />

        <Text style={styles.label}>Temps de repos (secondes)</Text>
        <TextInput
          style={styles.input}
          value={restTime}
          onChangeText={setRestTime}
          keyboardType='numeric'
          placeholder='15'
          placeholderTextColor='#666'
        />

        <Text style={styles.label}>Nombre de tours</Text>
        <TextInput
          style={styles.input}
          value={rounds}
          onChangeText={setRounds}
          keyboardType='numeric'
          placeholder='3'
          placeholderTextColor='#666'
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTimer}
        >
          <Text style={styles.createButtonText}>Créer le timer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#00ffff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
