import React, { useCallback } from 'react';
import { StatusBar, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserIcon, MailIcon, LogoutIcon } from '../../components/icons';
import { AppHeader, PrimaryButton, Card } from '../../components/common';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { useAuth } from '../../context/AuthContext';
import { styles } from './homeStyles';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [logout, navigation]);

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const name = user?.name || '';
  const email = user?.email || '';

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <AppHeader screenTitle={Strings.homeTitle} logoSize={40} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(name)}</Text>
          </View>
          <Text style={styles.welcomeText}>{Strings.welcomeBack}</Text>
          <Text style={styles.nameText}>{name}</Text>
        </Card>

        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <UserIcon size={22} color={Colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{Strings.nameLabel}</Text>
              <Text style={styles.infoValue}>{name}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MailIcon size={22} color={Colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{Strings.emailLabel}</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
          </View>
        </Card>

        <PrimaryButton
          title={Strings.logoutButton}
          onPress={handleLogout}
          variant="danger"
          icon={<LogoutIcon size={20} color={Colors.white} />}
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
