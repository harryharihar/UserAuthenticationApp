export const Strings = {
  // App
  appName: 'User Auth',
  appTagline: 'Secure. Simple. Swift.',
  logoText: 'UA',

  // Login Screen
  welcomeTitle: 'Welcome Back',
  welcomeSubtitle: 'Sign in to continue',

  // Input Placeholders
  emailPlaceholder: 'Email Address',
  passwordPlaceholder: 'Password',

  // Buttons
  signInButton: 'Sign In',
  signUpButton: 'Sign Up',

  // Links
  noAccountText: "Don't have an account? ",
  signUpLink: 'Sign Up',
} as const;

export type StringsType = typeof Strings;
