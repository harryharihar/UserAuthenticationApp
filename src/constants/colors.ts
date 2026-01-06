export const Colors = {
  // Primary colors
  primary: '#6C63FF',
  primaryDark: '#5A52D5',

  // Background colors
  background: '#F5F5F5',
  backgroundLight: '#FFFFFF',
  cardBackground: '#FFFFFF',

  // Text colors
  textDark: '#111111',
  textPrimary: '#222222',
  textSecondary: '#555555',
  textMuted: '#777777',

  // Input colors
  inputBackground: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputFocused: 'rgba(108,99,255,0.2)',

  // Utility colors
  white: '#FFFFFF',
  black: '#000000',

  // Overlay colors
  overlayPurple: 'rgba(108,99,255,0.08)',
  overlayPink: 'rgba(255,107,107,0.06)',
} as const;

export type ColorType = typeof Colors;
