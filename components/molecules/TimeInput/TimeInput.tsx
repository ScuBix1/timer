// components/molecules/TimeInput.tsx
import React from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  step?: number;
  min?: number;
  max?: number;
  keyboardType?: KeyboardTypeOptions;
}

const TimeInput = ({
  value,
  onChange,
  step = 15,
  min = 0,
  max = 3600,
  keyboardType = 'numeric',
}: Props) => {
  const handleChange = (text: string) => {
    const numeric = parseInt(text, 10);
    if (!isNaN(numeric)) {
      onChange(Math.max(min, Math.min(max, numeric)));
    }
  };

  const increment = () => {
    onChange(Math.min(value + step, max));
  };

  const decrement = () => {
    onChange(Math.max(value - step, min));
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    button: {
      backgroundColor: '#eee',
      padding: 10,
      borderRadius: 8,
    },
    symbol: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    input: {
      width: 80,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 16,
      paddingHorizontal: 8,
      backgroundColor: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={decrement} style={styles.button}>
        <Text style={styles.symbol}>−</Text>
      </Pressable>

      <TextInput
        value={value.toString()}
        onChangeText={handleChange}
        keyboardType={keyboardType}
        style={styles.input}
        maxLength={5}
      />

      <Pressable onPress={increment} style={styles.button}>
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
};

export default TimeInput;
