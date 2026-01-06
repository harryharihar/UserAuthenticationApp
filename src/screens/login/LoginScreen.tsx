import React, {useState, useCallback} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MailIcon, LockIcon, EyeIcon, CheckIcon} from '../../components/icons';
import {AppHeader, InputField, PrimaryButton, Card} from '../../components/common';
import {Colors} from '../../constants/colors';
import {Strings} from '../../constants/strings';
import {useAuth} from '../../context/AuthContext';
import {styles} from './loginStyles';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isEmailValid = email.trim() !== '' && validateEmail(email.trim());

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

  const handleLogin = useCallback(async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await login(email, password);
        if (result.success) {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        } else if (result.error === 'not_registered') {
          Alert.alert(Strings.error, Strings.userNotRegistered, [{text: Strings.ok}]);
        } else if (result.error === 'invalid_password') {
          Alert.alert(Strings.error, Strings.invalidPassword, [{text: Strings.ok}]);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [email, password, login, navigation, validateForm]);

  const clearError = (field: 'email' | 'password') => {
    if (errors[field]) setErrors(prev => ({...prev, [field]: undefined}));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <AppHeader screenTitle={Strings.loginTitle} />
          <View style={styles.formSection}>
            <Card>
              <InputField
                label="Email Address"
                icon={<MailIcon size={20} color={errors.email ? Colors.error : Colors.textSecondary} />}
                placeholder={Strings.emailPlaceholder}
                value={email}
                onChangeText={text => { setEmail(text); clearError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                rightIcon={isEmailValid ? <CheckIcon size={20} color={Colors.success} /> : undefined}
                editable={!isLoading}
              />
              <InputField
                label="Password"
                icon={<LockIcon size={20} color={errors.password ? Colors.error : Colors.textSecondary} />}
                placeholder={Strings.passwordPlaceholder}
                value={password}
                onChangeText={text => { setPassword(text); clearError('password'); }}
                secureTextEntry={!isPasswordVisible}
                error={errors.password}
                rightIcon={<EyeIcon size={20} color={Colors.textSecondary} visible={isPasswordVisible} />}
                onRightIconPress={() => setIsPasswordVisible(prev => !prev)}
                editable={!isLoading}
              />
              <PrimaryButton
                title={Strings.logInButton}
                onPress={handleLogin}
                isLoading={isLoading}
                style={styles.button}
              />
            </Card>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>{Strings.noAccountText}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')} disabled={isLoading}>
                <Text style={styles.link}>{Strings.signUpLink}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
