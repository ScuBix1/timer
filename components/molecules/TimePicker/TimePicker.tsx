import { useExercise } from '@/context/ExerciseContext';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

interface TimerPickerProps {
  type: string;
  title: string;
}

export default function TimerPicker(props: TimerPickerProps) {
  const { type, title } = props;

  const { duration, setDuration, rest, setRest } = useExercise();
  const [isVisible, setIsVisible] = useState(false);

  const currentValue = type === 'exercise' ? duration : rest;

  const handleConfirm = (value: number) => {
    if (type === 'exercise') setDuration(value);
    else setRest(value);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title={title} onPress={() => setIsVisible(true)} />
      <Text style={{ marginTop: 10 }}>
        Durée sélectionnée : {Math.floor(currentValue / 60)} min{' '}
        {currentValue % 60} sec
      </Text>

      <TimerPicker
        padWithNItems={2}
        minuteLabel='min'
        secondLabel='sec'
        hideHours
        onDurationChange={(d) => setDuration(d)}
      />
    </View>
  );
}
