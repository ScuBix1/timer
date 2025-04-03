import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { ViewStyle, useColorScheme } from 'react-native';

interface IconProps {
  icon: IconDefinition;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const Icon: React.FC<IconProps> = ({ icon, size = 24, color, style }) => {
  const colorScheme = useColorScheme();

  if (!color && colorScheme === 'dark') {
    color = DarkTheme.colors.text;
  }

  if (!color && colorScheme !== 'dark') {
    color = DefaultTheme.colors.text;
  }

  return (
    <FontAwesomeIcon icon={icon} size={size} color={color} style={style} />
  );
};

export default Icon;
