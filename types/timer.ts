export interface Timer {
  id: string;
  name: string;
  workTime: number;
  restTime: number;
  rounds: number;
}

export interface TimerState {
  timers: Timer[];
  currentTimer: Timer | null;
  isRunning: boolean;
  currentRound: number;
  remainingTime: number;
  isResting: boolean;
}
