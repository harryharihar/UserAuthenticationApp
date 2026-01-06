import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  inputWrapperError: {
    borderColor: Colors.error,
    backgroundColor: 'rgba(220,53,69,0.05)',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
  rightIcon: {
    padding: 8,
  },
  errorContainer: {
    height: 20,
    justifyContent: 'center',
    marginTop: 4,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginLeft: 4,
  },
});
