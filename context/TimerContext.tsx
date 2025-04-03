import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Timer, TimerState } from '../types/timer';

type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'REMOVE_TIMER'; payload: string }
  | { type: 'SET_CURRENT_TIMER'; payload: Timer | null }
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'TICK' }
  | { type: 'SET_TIMERS'; payload: Timer[] };

const initialState: TimerState = {
  timers: [],
  currentTimer: null,
  isRunning: false,
  currentRound: 1,
  remainingTime: 0,
  isResting: false,
};

const TimerContext = createContext<{
  state: TimerState;
  dispatch: React.Dispatch<TimerAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
    case 'REMOVE_TIMER':
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload),
      };
    case 'SET_CURRENT_TIMER':
      return {
        ...state,
        currentTimer: action.payload,
        remainingTime: action.payload ? action.payload.workTime : 0,
        currentRound: 1,
        isResting: false,
      };
    case 'START_TIMER':
      return {
        ...state,
        isRunning: true,
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        isRunning: false,
      };
    case 'RESET_TIMER':
      return {
        ...state,
        isRunning: false,
        currentRound: 1,
        remainingTime: state.currentTimer?.workTime || 0,
        isResting: false,
      };
    case 'TICK':
      if (!state.currentTimer || !state.isRunning) return state;

      const newRemainingTime = state.remainingTime - 1;
      if (newRemainingTime < 0) {
        if (state.isResting) {
          if (state.currentRound >= state.currentTimer.rounds) {
            return {
              ...state,
              isRunning: false,
              currentRound: 1,
              remainingTime: state.currentTimer.workTime,
              isResting: false,
            };
          }
          return {
            ...state,
            currentRound: state.currentRound + 1,
            remainingTime: state.currentTimer.workTime,
            isResting: false,
          };
        } else {
          if (state.currentRound >= state.currentTimer.rounds) {
            return {
              ...state,
              isRunning: false,
              currentRound: 1,
              remainingTime: state.currentTimer.workTime,
              isResting: false,
            };
          }
          return {
            ...state,
            remainingTime: state.currentTimer.restTime,
            isResting: true,
          };
        }
      }
      return {
        ...state,
        remainingTime: newRemainingTime,
      };
    case 'SET_TIMERS':
      return {
        ...state,
        timers: action.payload,
      };
    default:
      return state;
  }
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const loadTimers = async () => {
      const savedTimers = await AsyncStorage.getItem('timers');
      if (savedTimers) {
        dispatch({ type: 'SET_TIMERS', payload: JSON.parse(savedTimers) });
      }
    };
    loadTimers();
  }, []);

  useEffect(() => {
    const saveTimers = async () => {
      await AsyncStorage.setItem('timers', JSON.stringify(state.timers));
    };
    saveTimers();
  }, [state.timers]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
