import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  text?: string;
}

const ButtonStart = (props: ButtonProps) => {
  const { text } = props;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#CCCFCC',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 50,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonStart;
