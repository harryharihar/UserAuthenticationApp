# User Authentication App

A React Native mobile application demonstrating user authentication flows using React Context API for state management with Material Design UI.

## Features

- User Registration & Login
- Form Validation with error messages
- Global State Management using React Context API
- Protected Routes
- User Profile Display
- Logout Functionality
- Material Design UI

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React Native | Mobile app framework |
| TypeScript | Type-safe JavaScript |
| React Context API | Global state management |
| React Navigation | Screen navigation |
| AsyncStorage | Local data persistence |

## Project Structure

```
UserAuthenticationApp/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── styles/
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
│       ├── signup/
│       └── home/
├── App.tsx
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

## Installation

```bash
# Clone the repository
git clone https://github.com/harryharihar/UserAuthenticationApp.git
cd UserAuthenticationApp

# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

## Running the App

```bash
# Start Metro Bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Architecture

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

## Screens

| Screen | Description |
|--------|-------------|
| Login | Email & password authentication |
| Sign Up | New user registration |
| Home | User profile with logout |

## Author

**Harihar Khobragade**
- GitHub: [@harryharihar](https://github.com/harryharihar)
