import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (totalSeconds: number) => void;
  initialSeconds?: number;
}

const CustomTimerPicker = ({
  visible,
  onClose,
  onConfirm,
  initialSeconds = 0,
}: Props) => {
  const initialMinutes = Math.floor(initialSeconds / 60);
  const initialSec = initialSeconds % 60;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSec);
  console.log(seconds, minutes);

  return (
    <Modal visible={visible} transparent animationType='slide'>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choisis une durée</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={minutes}
              onValueChange={(value) => setMinutes(value)}
              style={styles.picker}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i} min`} value={i} />
              ))}
            </Picker>

            <Picker
              selectedValue={seconds}
              onValueChange={(value) => setSeconds(value)}
              style={styles.picker}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <Picker.Item key={i} label={`${i} sec`} value={i} />
              ))}
            </Picker>
          </View>

          <View style={styles.buttons}>
            <Button title='Annuler' onPress={onClose} />
            <Button
              title='Valider'
              onPress={() => {
                onConfirm(minutes * 60 + seconds);
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CustomTimerPicker;
