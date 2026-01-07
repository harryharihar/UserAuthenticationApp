import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { styles } from './styles/inputFieldStyles';

interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  icon: React.ReactNode;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, icon, error, rightIcon, onRightIconPress, ...textInputProps }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
          <View style={styles.icon}>{icon}</View>
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={Colors.textSecondary}
            {...textInputProps}
            autoComplete="off"
            importantForAutofill="no"
            textContentType="oneTimeCode"
            autoCorrect={false}
            spellCheck={false}
            passwordRules=""
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
  }
);
