import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textWithIcon: {
    marginLeft: 8,
  },
});
