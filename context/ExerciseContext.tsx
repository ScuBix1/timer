import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ExerciseContextProps {
  duration: number;
  rest: number;
  round: number;
  name?: string;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setRest: React.Dispatch<React.SetStateAction<number>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setName?: React.Dispatch<React.SetStateAction<string>>;
}

const ExerciseContext = createContext<ExerciseContextProps | undefined>(
  undefined
);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [duration, setDuration] = useState<number>(0);
  const [rest, setRest] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [name, setName] = useState<string>('');

  console.log(duration, rest);

  return (
    <ExerciseContext.Provider
      value={{
        duration,
        rest,
        round,
        name,
        setDuration,
        setRest,
        setRound,
        setName,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercise must be used within an ExerciseProvider');
  }
  return context;
};
