import Title from '@/components/atoms/Title/Title';
import ExerciseCard from '@/components/molecules/ExerciseCard/ExerciseCard';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function Index() {
  const styles = StyleSheet.create({
    layout: { marginVertical: 'auto' },
    card: { marginHorizontal: 'auto', gap: 20 },
  });

  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.card}>
        <Title text='Cliquez sur un chrono prédéfinis' />
        <ExerciseCard
          title='Force'
          description='Efforts courts avec de longues phases de récupération pour maximiser la performance musculaire.'
          durationInSecond={8}
          restInSecond={90}
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
        <ExerciseCard
          title='Explosivité'
          description=' On vise des mouvements rapides et intenses, souvent utilisés dans les sports de vitesse ou de puissance.'
          durationInSecond={15}
          restInSecond={45}
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
        <ExerciseCard
          title='Endurance'
          description='Séries modérées à longues avec des charges intermédiaires, dans le but de stimuler la croissance musculaire.'
          durationInSecond={60}
          restInSecond={40}
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
