import React from 'react';
import {View, Text, TextInput, TouchableOpacity, TextInputProps} from 'react-native';
import {Colors} from '../../constants/colors';
import {styles} from './styles/inputFieldStyles';

interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  icon: React.ReactNode;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  error,
  rightIcon,
  onRightIconPress,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
        <View style={styles.icon}>{icon}</View>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
          {...textInputProps}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};
