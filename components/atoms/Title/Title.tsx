import { PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TitleProps extends PropsWithChildren {
  text?: string;
}

export default function Title(props: TitleProps) {
  const { text } = props;
  const styles = StyleSheet.create({
    title: { fontWeight: 'bold', fontSize: 20 },
  });

  return <Text style={[styles.title]}>{text}</Text>;
}
