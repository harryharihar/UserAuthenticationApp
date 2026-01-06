export const Strings = {
  // App
  appName: 'User Auth',
  appTagline: 'Secure. Simple. Swift.',
  logoText: 'UA',

  // Login Screen
  welcomeTitle: 'Welcome Back',
  welcomeSubtitle: 'Sign in to continue',

  // Sign Up Screen
  signUpTitle: 'Create Account',
  signUpSubtitle: 'Sign up to get started',

  // Input Placeholders
  namePlaceholder: 'Full Name',
  emailPlaceholder: 'Email Address',
  passwordPlaceholder: 'Password',

  // Buttons
  signInButton: 'Sign In',
  signUpButton: 'Sign Up',

  // Links
  noAccountText: "Don't have an account? ",
  signUpLink: 'Sign Up',
  haveAccountText: 'Already have an account? ',
  signInLink: 'Sign In',

  // Error Messages
  nameRequired: 'Name is required',
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required',
} as const;

export type StringsType = typeof Strings;
