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
import {MailIcon, LockIcon, EyeIcon} from '../../components/icons';
import {Colors} from '../../constants/colors';
import {Strings} from '../../constants/strings';
import {styles} from './loginStyle';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: {name: string; email: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const ICON_SIZE = 22;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const validateForm = useCallback(() => {
    const newErrors: {email?: string; password?: string} = {};
    if (!email.trim()) {
      newErrors.email = Strings.emailRequired;
    } else if (!validateEmail(email.trim())) {
      newErrors.email = Strings.emailInvalid;
    }
    if (!password.trim()) {
      newErrors.password = Strings.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = Strings.passwordTooShort;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleLogin = useCallback(() => {
    if (validateForm()) {
      const userName = email.split('@')[0];
      navigation.navigate('Home', {name: userName, email: email});
    }
  }, [email, navigation, validateForm]);

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp');
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
              <Text style={styles.title}>{Strings.welcomeTitle}</Text>
              <Text style={styles.subtitle}>{Strings.welcomeSubtitle}</Text>

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
                  textContentType="oneTimeCode"
                  autoComplete="off"
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
                  textContentType="oneTimeCode"
                  autoComplete="off"
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
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}>
                <Text style={styles.loginButtonText}>{Strings.signInButton}</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>{Strings.noAccountText}</Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signUpLink}>{Strings.signUpLink}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
