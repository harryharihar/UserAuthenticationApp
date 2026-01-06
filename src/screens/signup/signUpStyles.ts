import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -20,
  },
  button: {
    marginTop: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    paddingBottom: 32,
  },
  linkText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
