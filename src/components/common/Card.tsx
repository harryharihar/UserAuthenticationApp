import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './styles/cardStyles';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};
