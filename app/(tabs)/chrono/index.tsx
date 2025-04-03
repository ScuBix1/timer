import ButtonStart from '@/components/atoms/ButtonStart/ButtonStart';
import Title from '@/components/atoms/Title/Title';
import TimePicker from '@/components/molecules/TimePicker/TimePicker';
import { useExercise } from '@/context/ExerciseContext';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const styles = StyleSheet.create({
    container: { marginHorizontal: 'auto', marginVertical: 'auto' },
  });
  const { duration, setDuration, rest, setRest } = useExercise();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 50 }}>
        <View style={{ gap: 15 }}>
          <Title text={"Temps d'exercice"} />
          <TimePicker title="Temps de l'exercice" type='exercise' />
        </View>
        <View style={{ gap: 15 }}>
          <Title text={'Temps de repos'} />
          <TimePicker title='Temps du repos' type='rest' />
        </View>
        <ButtonStart text='Démarrer le chrono' />
      </View>
    </SafeAreaView>
  );
}
