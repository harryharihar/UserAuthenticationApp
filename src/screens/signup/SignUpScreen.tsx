import React, {useState, useCallback} from 'react';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserIcon, MailIcon, LockIcon, EyeIcon} from '../../components/icons';
import {Colors} from '../../constants/colors';
import {Strings} from '../../constants/strings';
import {styles} from './signUpStyle';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const ICON_SIZE = 22;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; password?: string}>({});

  const validateForm = useCallback(() => {
    const newErrors: {name?: string; email?: string; password?: string} = {};
    if (!name.trim()) {
      newErrors.name = Strings.nameRequired;
    }
    if (!email.trim()) {
      newErrors.email = Strings.emailRequired;
    }
    if (!password.trim()) {
      newErrors.password = Strings.passwordRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, password]);

  const handleSignUp = useCallback(() => {
    if (validateForm()) {
      console.log('Sign Up pressed', {name, email, password});
    }
  }, [name, email, password, validateForm]);

  const handleSignIn = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.backgroundDecoration}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>{Strings.logoText}</Text>
              </View>
              <Text style={styles.appName}>{Strings.appName}</Text>
              <Text style={styles.tagline}>{Strings.appTagline}</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>{Strings.signUpTitle}</Text>
              <Text style={styles.subtitle}>{Strings.signUpSubtitle}</Text>

              <View
                style={[
                  styles.inputWrapper,
                  errors.name && styles.inputWrapperError,
                ]}>
                <View style={styles.inputIcon}>
                  <UserIcon size={ICON_SIZE} color={errors.name ? Colors.error : Colors.textSecondary} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={Strings.namePlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                  value={name}
                  onChangeText={text => {
                    setName(text);
                    if (errors.name) {
                      setErrors(prev => ({...prev, name: undefined}));
                    }
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.errorContainer}>
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View
                style={[
                  styles.inputWrapper,
                  errors.email && styles.inputWrapperError,
                ]}>
                <View style={styles.inputIcon}>
                  <MailIcon size={ICON_SIZE} color={errors.email ? Colors.error : Colors.textSecondary} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={Strings.emailPlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors(prev => ({...prev, email: undefined}));
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.errorContainer}>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View
                style={[
                  styles.inputWrapper,
                  errors.password && styles.inputWrapperError,
                ]}>
                <View style={styles.inputIcon}>
                  <LockIcon size={ICON_SIZE} color={errors.password ? Colors.error : Colors.textSecondary} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={Strings.passwordPlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors(prev => ({...prev, password: undefined}));
                    }
                  }}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={togglePasswordVisibility}>
                  <EyeIcon
                    size={ICON_SIZE}
                    color={Colors.primary}
                    visible={isPasswordVisible}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.errorContainer}>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
                activeOpacity={0.8}>
                <Text style={styles.signUpButtonText}>{Strings.signUpButton}</Text>
              </TouchableOpacity>

              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>{Strings.haveAccountText}</Text>
                <TouchableOpacity onPress={handleSignIn}>
                  <Text style={styles.signInLink}>{Strings.signInLink}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;
