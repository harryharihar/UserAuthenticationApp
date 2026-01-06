import React, {useCallback} from 'react';
import {StatusBar, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserIcon, MailIcon, LogoutIcon} from '../../components/icons';
import {Colors} from '../../constants/colors';
import {Strings} from '../../constants/strings';
import {styles} from './homeStyle';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: {name: string; email: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

const ICON_SIZE = 24;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<HomeRouteProp>();
  const {name, email} = route.params;

  const handleLogout = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }, [navigation]);

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.backgroundDecoration}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{Strings.homeTitle}</Text>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getInitials(name)}</Text>
            </View>
            <Text style={styles.welcomeText}>{Strings.welcomeBack}</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <UserIcon size={ICON_SIZE} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>{Strings.nameLabel}</Text>
                  <Text style={styles.infoValue}>{name}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <MailIcon size={ICON_SIZE} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>{Strings.emailLabel}</Text>
                  <Text style={styles.infoValue}>{email}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.logoutSection}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}>
              <LogoutIcon size={22} color={Colors.white} />
              <Text style={styles.logoutButtonText}>{Strings.logoutButton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
