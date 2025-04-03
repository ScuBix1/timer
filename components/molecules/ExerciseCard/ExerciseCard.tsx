import { useExercise } from '@/context/ExerciseContext';
import { router } from 'expo-router';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import SubTitle from '../../atoms/SubTitle/SubTitle';

interface ExerciseCardProps {
  title?: string;
  description?: string;
  durationInSecond?: number;
  restInSecond?: number;
  style?: ViewStyle;
}

const ExerciseCard = (props: ExerciseCardProps) => {
  const { title, description, durationInSecond, restInSecond, style } = props;
  const styles = {
    card: {
      borderColor: '#000000',
      backgroundColor: '#ffffff',
      borderWidth: 2,
      gap: 5,
    },
  };

  let durationText: string;
  let restText: string;
  const { setDuration, setRest } = useExercise();

  durationText = `${durationInSecond ? durationInSecond : 0} sec`;
  if (durationInSecond && durationInSecond > 0 && durationInSecond > 59) {
    const durationMinutes = Math.floor(durationInSecond / 60);
    const durationSecondes = durationInSecond % 60;
    durationText = `${durationMinutes} min ${durationSecondes} sec`;
    if (durationSecondes === 0) {
      durationText = `${durationMinutes} min`;
    }
  }
  restText = `${restInSecond ? restInSecond : 0} sec`;
  if (restInSecond && restInSecond > 0 && restInSecond > 59) {
    const durationMinutes = Math.floor(restInSecond / 60);
    const durationSecondes = restInSecond % 60;
    restText = `${durationMinutes} min ${durationSecondes} sec`;
    if (durationSecondes === 0) {
      restText = `${durationMinutes} min`;
    }
  }

  const onClick = () => {
    setDuration(durationInSecond ? durationInSecond : 0);
    setRest(restInSecond ? restInSecond : 0);
    router.push('/(tabs)/chrono');
  };

  return (
    <Pressable onPress={onClick}>
      <View style={[styles.card, style]}>
        <SubTitle text={title} />
        <Text>{description}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 15,
          }}
        >
          <Text
            style={{
              backgroundColor: '#00FF00',
              borderRadius: 100,
              paddingVertical: 1,
              paddingHorizontal: 5,
            }}
          >
            {durationText}
          </Text>
          <Text
            style={{
              backgroundColor: '#FF0000',
              borderRadius: 100,
              paddingVertical: 1,
              paddingHorizontal: 5,
            }}
          >
            {restText}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExerciseCard;
