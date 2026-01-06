export const Strings = {
  // App
  appName: 'User Authentication',

  // Screen Titles
  loginTitle: 'Login',
  createAccountTitle: 'Create Account',
  homeTitle: 'Profile',

  // Input Placeholders
  namePlaceholder: 'Full Name',
  emailPlaceholder: 'Email Address',
  passwordPlaceholder: 'Password',

  // Buttons
  logInButton: 'Log in',
  signUpButton: 'Sign up',
  logoutButton: 'Logout',

  // Links
  noAccountText: "Don't have an account? ",
  signUpLink: 'Sign Up',
  haveAccountText: 'Already have an account? ',
  loginLink: 'Login',

  // Labels
  nameLabel: 'Full Name',
  emailLabel: 'Email Address',
  welcomeBack: 'Welcome back,',

  // Validation Errors
  nameRequired: 'Please enter your name',
  emailRequired: 'Please enter your email',
  emailInvalid: 'Invalid email format',
  passwordRequired: 'Please enter your password',
  passwordTooShort: 'Minimum 6 characters required',

  // Auth Errors
  userNotRegistered: 'User not registered. Please sign up first.',
  invalidPassword: 'Invalid password. Please try again.',
  userAlreadyRegistered: 'User already registered. Please sign in.',
  error: 'Error',
  ok: 'OK',
} as const;
