import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, ViewStyle} from 'react-native';
import {Colors} from '../../constants/colors';
import {styles} from './styles/primaryButtonStyles';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'primary' | 'danger';
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  variant = 'primary',
  icon,
}) => {
  const backgroundColor = variant === 'danger' ? Colors.error : Colors.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor, shadowColor: backgroundColor},
        (isLoading || disabled) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading || disabled}>
      {isLoading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, icon && styles.textWithIcon]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
