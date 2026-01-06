import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LogoIcon} from '../icons';
import {Strings} from '../../constants/strings';
import {styles} from './styles/appHeaderStyles';

interface AppHeaderProps {
  screenTitle: string;
  logoSize?: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({screenTitle, logoSize = 55}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top + 20}]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LogoIcon size={logoSize} />
        </View>
        <Text style={styles.appName}>{Strings.appName}</Text>
        <Text style={styles.screenTitle}>{screenTitle}</Text>
      </View>
    </View>
  );
};
