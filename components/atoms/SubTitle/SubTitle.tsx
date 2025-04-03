import { StyleSheet, Text } from 'react-native';

interface SubTitleProps {
  text?: string;
}

const SubTitle = (props: SubTitleProps) => {
  const { text } = props;
  const styles = StyleSheet.create({
    title: { fontWeight: 'bold', fontSize: 15 },
  });

  return <Text style={styles.title}>{text}</Text>;
};

export default SubTitle;
