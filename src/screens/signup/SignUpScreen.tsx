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
import {UserIcon, MailIcon, LockIcon, EyeIcon} from '../../components/icons';
import {AppHeader, InputField, PrimaryButton, Card} from '../../components/common';
import {Colors} from '../../constants/colors';
import {Strings} from '../../constants/strings';
import {useAuth} from '../../context/AuthContext';
import {styles} from './signUpStyles';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {signup} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; password?: string}>({});

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateForm = useCallback(() => {
    const newErrors: {name?: string; email?: string; password?: string} = {};
    if (!name.trim()) newErrors.name = Strings.nameRequired;
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
  }, [name, email, password]);

  const handleSignUp = useCallback(async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const result = await signup(name, email, password);
        if (result.success) {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        } else if (result.error === 'already_registered') {
          Alert.alert(Strings.error, Strings.userAlreadyRegistered, [{text: Strings.ok}]);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [name, email, password, signup, navigation, validateForm]);

  const clearError = (field: 'name' | 'email' | 'password') => {
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
          <AppHeader screenTitle={Strings.createAccountTitle} logoSize={48} />
          <View style={styles.formSection}>
            <Card>
              <InputField
                label="Full Name"
                icon={<UserIcon size={20} color={errors.name ? Colors.error : Colors.textSecondary} />}
                placeholder={Strings.namePlaceholder}
                value={name}
                onChangeText={text => { setName(text); clearError('name'); }}
                autoCapitalize="words"
                error={errors.name}
                editable={!isLoading}
              />
              <InputField
                label="Email Address"
                icon={<MailIcon size={20} color={errors.email ? Colors.error : Colors.textSecondary} />}
                placeholder={Strings.emailPlaceholder}
                value={email}
                onChangeText={text => { setEmail(text); clearError('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
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
                title={Strings.signUpButton}
                onPress={handleSignUp}
                isLoading={isLoading}
                style={styles.button}
              />
            </Card>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>{Strings.haveAccountText}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={isLoading}>
                <Text style={styles.link}>{Strings.loginLink}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
