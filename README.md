# User Authentication App

A React Native mobile application demonstrating user authentication flows using React Context API for state management with Material Design UI.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Architecture](#architecture)
- [Authentication Flow](#authentication-flow)
- [Context API Implementation](#context-api-implementation)
- [Screens](#screens)
- [Reusable Components](#reusable-components)
- [Form Validation](#form-validation)
- [Troubleshooting](#troubleshooting)

## Features

- **User Registration (Sign Up)**: Create new account with name, email, and password
- **User Login**: Authenticate existing users
- **Form Validation**: Real-time validation with error messages
  - Email format validation
  - Password minimum length (6 characters)
  - Required field validation
- **Global State Management**: Using React Context API
- **Protected Routes**: Home screen accessible only after authentication
- **User Profile Display**: Shows logged-in user's name and email
- **Logout Functionality**: Clear session and return to login
- **Material Design UI**: Modern card-based interface with shadows and rounded corners
- **Reusable Components**: Modular component architecture for maintainability
- **Custom SVG Logo**: Vector-based logo with purple gradient

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React Native | Mobile app framework |
| TypeScript | Type-safe JavaScript |
| React Context API | Global state management |
| React Navigation | Screen navigation |
| react-native-safe-area-context | Safe area handling |
| react-native-svg | SVG icon support |

## Project Structure

```
UserAuthenticationApp/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── styles/
│   │   │   │   ├── appHeaderStyles.ts
│   │   │   │   ├── inputFieldStyles.ts
│   │   │   │   ├── primaryButtonStyles.ts
│   │   │   │   ├── cardStyles.ts
│   │   │   │   └── index.ts
│   │   │   ├── AppHeader.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   └── icons/
│   │       └── index.tsx
│   ├── constants/
│   │   ├── colors.ts
│   │   └── strings.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   └── screens/
│       ├── login/
│       │   ├── LoginScreen.tsx
│       │   └── loginStyles.ts
│       ├── signup/
│       │   ├── SignUpScreen.tsx
│       │   └── signUpStyles.ts
│       └── home/
│           ├── HomeScreen.tsx
│           └── homeStyles.ts
├── App.tsx
├── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Xcode** (for iOS development, macOS only)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)

### Environment Setup

Follow the official React Native environment setup guide:
[React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harryharihar/UserAuthenticationApp.git
   cd UserAuthenticationApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

## Running the App

### Start Metro Bundler

```bash
npm start
```

### Run on iOS

```bash
npm run ios
# OR
npx react-native run-ios
```

### Run on Android

```bash
npm run android
# OR
npx react-native run-android
```

## Architecture

### Overview

The app follows a clean architecture pattern with separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│                   (Navigation Setup)                    │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                    AuthProvider                         │
│              (Context API Wrapper)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │  State:                                          │   │
│  │  - user: Current logged-in user                  │   │
│  │  - registeredUsers: Array of all users           │   │
│  │  - isAuthenticated: Boolean flag                 │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Functions:                                      │   │
│  │  - login(email, password)                        │   │
│  │  - signup(name, email, password)                 │   │
│  │  - logout()                                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  LoginScreen  │ │ SignUpScreen  │ │  HomeScreen   │
│               │ │               │ │               │
│  useAuth()    │ │  useAuth()    │ │  useAuth()    │
└───────────────┘ └───────────────┘ └───────────────┘
```

## Authentication Flow

### Registration Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  SignUp      │     │  Validate    │     │  Check if    │
│  Screen      │────▶│  Form        │────▶│  Email       │
│              │     │              │     │  Exists      │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                     ┌────────────────────────────┼────────────────────────────┐
                     │                            │                            │
                     ▼                            ▼                            │
              ┌──────────────┐            ┌──────────────┐                     │
              │  Email       │            │  Register    │                     │
              │  Exists      │            │  New User    │                     │
              │  (Error)     │            │              │                     │
              └──────────────┘            └──────┬───────┘                     │
                                                 │                             │
                                                 ▼                             │
                                          ┌──────────────┐                     │
                                          │  Auto Login  │                     │
                                          │  & Navigate  │                     │
                                          │  to Home     │                     │
                                          └──────────────┘                     │
```

### Login Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Login       │     │  Validate    │     │  Find User   │
│  Screen      │────▶│  Form        │────▶│  by Email    │
│              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                     ┌────────────────────────────┼────────────────────────────┐
                     │                            │                            │
                     ▼                            ▼                            │
              ┌──────────────┐            ┌──────────────┐                     │
              │  User Not    │            │  Verify      │                     │
              │  Found       │            │  Password    │                     │
              │  (Error)     │            │              │                     │
              └──────────────┘            └──────┬───────┘                     │
                                                 │                             │
                                    ┌────────────┴────────────┐                │
                                    │                         │                │
                                    ▼                         ▼                │
                             ┌──────────────┐          ┌──────────────┐        │
                             │  Wrong       │          │  Login       │        │
                             │  Password    │          │  Success     │        │
                             │  (Error)     │          │  Navigate    │        │
                             └──────────────┘          │  to Home     │        │
                                                       └──────────────┘        │
```

## Context API Implementation

### What is Context API?

Context provides a way to pass data through the component tree without having to pass props manually at every level. It's ideal for global state like:
- User authentication
- Theme settings
- Language preferences

### AuthContext Structure

```typescript
interface AuthContextType {
  user: User | null;                    // Current logged-in user
  isAuthenticated: boolean;             // Quick auth check
  registeredUsers: RegisteredUser[];    // All registered users
  login: (email, password) => Promise<LoginResult>;
  signup: (name, email, password) => Promise<SignupResult>;
  logout: () => void;
}
```

### Usage in Components

```typescript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, login, logout, signup, isAuthenticated } = useAuth();

  // Use auth functions and state
};
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Provider** | Wraps app and provides context value to all children |
| **Consumer** | Components that use the context via `useAuth()` hook |
| **State** | `user` and `registeredUsers` managed with `useState` |
| **Actions** | `login`, `signup`, `logout` functions using `useCallback` |

## Screens

### 1. Login Screen

**Path:** `src/screens/login/LoginScreen.tsx`

**Features:**
- Email input with validation
- Password input with show/hide toggle
- Login button with loading state
- Navigation to Sign Up screen
- Error alerts for invalid credentials

**Validation:**
- Email: Required + valid format
- Password: Required + minimum 6 characters

### 2. Sign Up Screen

**Path:** `src/screens/signup/SignUpScreen.tsx`

**Features:**
- Full name input
- Email input with validation
- Password input with show/hide toggle
- Sign Up button with loading state
- Navigation to Login screen
- Error alert if email already registered

**Validation:**
- Name: Required
- Email: Required + valid format + unique
- Password: Required + minimum 6 characters

### 3. Home Screen

**Path:** `src/screens/home/HomeScreen.tsx`

**Features:**
- User avatar with initials
- Welcome message with user name
- Profile card showing name and email
- Logout button

## Reusable Components

### AppHeader

**Path:** `src/components/common/AppHeader.tsx`

A consistent header component used across all screens featuring:
- Logo in white circular container
- App name "User Authentication"
- Screen-specific title
- Purple gradient background with rounded bottom corners

**Props:**
- `screenTitle`: string - The title to display
- `logoSize`: number (optional) - Size of the logo icon

### InputField

**Path:** `src/components/common/InputField.tsx`

A styled input field with label, icon support, and error handling:
- Label above input
- Left icon support
- Right icon with onPress (for password toggle)
- Fixed height error container (prevents layout shift)
- Error state styling

**Props:**
- `label`: string - Input label
- `icon`: ReactNode - Left icon
- `error`: string (optional) - Error message
- `rightIcon`: ReactNode (optional) - Right icon
- `onRightIconPress`: function (optional) - Right icon press handler
- All TextInput props supported

### PrimaryButton

**Path:** `src/components/common/PrimaryButton.tsx`

A styled button with variants and loading state:
- Primary (purple) and Danger (red) variants
- Loading spinner
- Icon support
- Shadow elevation

**Props:**
- `title`: string - Button text
- `onPress`: function - Press handler
- `isLoading`: boolean (optional) - Shows loading spinner
- `disabled`: boolean (optional) - Disables button
- `variant`: 'primary' | 'danger' (optional) - Button style
- `icon`: ReactNode (optional) - Button icon

### Card

**Path:** `src/components/common/Card.tsx`

A container with Material Design styling:
- White background
- Rounded corners (16px)
- Shadow elevation
- Padding

**Props:**
- `children`: ReactNode - Card content
- `style`: ViewStyle (optional) - Additional styles

## Form Validation

### Email Validation

```typescript
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Password Validation

- Minimum 6 characters required
- Cannot be empty

### Error Messages

| Field | Error Type | Message |
|-------|------------|---------|
| Name | Empty | "Please enter your name" |
| Email | Empty | "Please enter your email" |
| Email | Invalid format | "Invalid email format" |
| Password | Empty | "Please enter your password" |
| Password | Too short | "Minimum 6 characters required" |
| Login | Not registered | "User not registered. Please sign up first." |
| Login | Wrong password | "Invalid password. Please try again." |
| Sign Up | Already exists | "User already registered. Please sign in." |

## Dependencies

```json
{
  "dependencies": {
    "react": "19.2.0",
    "react-native": "0.83.1",
    "@react-navigation/native": "^7.x",
    "@react-navigation/native-stack": "^7.x",
    "react-native-safe-area-context": "^5.x",
    "react-native-screens": "^4.x",
    "react-native-svg": "^15.x",
    "@react-native-async-storage/async-storage": "^2.x"
  }
}
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **iOS build fails**
   ```bash
   cd ios
   pod deintegrate
   pod install
   cd ..
   ```

3. **Android build fails**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

4. **TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

### iOS Simulator Issues

If the app doesn't launch on iOS simulator:
```bash
xcrun simctl shutdown all
xcrun simctl erase all
```

### Port Already in Use

```bash
lsof -ti:8081 | xargs kill -9
```

## Testing the App

1. **Start the app** and you'll see the Login screen
2. **Try to login** without registering - you'll see "User not registered" alert
3. **Go to Sign Up** and create an account
4. **After signup**, you'll be automatically logged in and redirected to Home
5. **Home screen** shows your name and email
6. **Logout** and try logging in with your credentials
7. **Login succeeds** and shows your profile

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is for educational purposes as part of a React Native assignment.

## Author

**Harihar Khobragade**
- GitHub: [@harryharihar](https://github.com/harryharihar)
