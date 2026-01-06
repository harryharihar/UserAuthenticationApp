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
import {MailIcon, LockIcon, EyeIcon} from '../../components/icons';
import {Colors} from '../../constants/colors';
import {Strings} from '../../constants/strings';
import {styles} from './loginStyle';

const ICON_SIZE = 22;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = useCallback(() => {
    console.log('Login pressed', {email, password});
  }, [email, password]);

  const handleSignUp = useCallback(() => {
    console.log('Sign Up pressed');
  }, []);

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

              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <MailIcon size={ICON_SIZE} color={Colors.textSecondary} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={Strings.emailPlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <LockIcon size={ICON_SIZE} color={Colors.textSecondary} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={Strings.passwordPlaceholder}
                  placeholderTextColor={Colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
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
