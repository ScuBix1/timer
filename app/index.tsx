import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTimer } from '../context/TimerContext';

export default function HomeScreen() {
  const { state, dispatch } = useTimer();

  const handleDeleteTimer = (id: string) => {
    dispatch({ type: 'REMOVE_TIMER', payload: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Timers</Text>
        <Link href='/create-timer' asChild>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name='add-circle' size={24} color='#fff' />
          </TouchableOpacity>
        </Link>
      </View>

      <FlatList
        data={state.timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.timerCard}>
            <Link href={`/timer/${item.id}`} asChild>
              <TouchableOpacity style={styles.timerInfo}>
                <Text style={styles.timerName}>{item.name}</Text>
                <Text style={styles.timerDetails}>
                  {item.workTime}s travail • {item.restTime}s repos •{' '}
                  {item.rounds} tours
                </Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTimer(item.id)}
            >
              <Ionicons name='trash-outline' size={24} color='#ff4444' />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    padding: 8,
  },
  listContainer: {
    padding: 20,
  },
  timerCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  timerInfo: {
    flex: 1,
    padding: 15,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  timerDetails: {
    fontSize: 14,
    color: '#888',
  },
  deleteButton: {
    padding: 15,
    justifyContent: 'center',
  },
});
