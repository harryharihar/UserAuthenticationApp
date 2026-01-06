/**
 * AuthContext.tsx
 *
 * This file implements the Authentication Context using React's Context API.
 * It provides global state management for user authentication across the app.
 *
 * WHAT IS CONTEXT API?
 * - Context provides a way to pass data through the component tree without
 *   having to pass props down manually at every level (prop drilling).
 * - It's ideal for global state like authentication, themes, or language settings.
 *
 * HOW THIS AUTHENTICATION WORKS:
 * 1. AuthProvider wraps the entire app and maintains authentication state
 * 2. Any component can access auth state using the useAuth() hook
 * 3. Users must first register (signup) before they can login
 * 4. Registered users are stored in memory (registeredUsers array)
 * 5. Current logged-in user is stored in the 'user' state
 */

import React, {createContext, useContext, useState, useCallback, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage Keys
 * Constants for storing data in AsyncStorage
 * Using constants prevents typos and makes keys easy to change
 */
const STORAGE_KEYS = {
  USER: '@auth_user',
  REGISTERED_USERS: '@auth_registered_users',
};

/**
 * User Interface
 * Represents the basic user information displayed in the app
 * - name: User's full name (entered during signup)
 * - email: User's email address (used as unique identifier)
 */
interface User {
  name: string;
  email: string;
}

/**
 * RegisteredUser Interface
 * Extends User to include password for authentication
 * - Inherits name and email from User
 * - password: User's password (stored for login verification)
 *
 * NOTE: In a real app, passwords should NEVER be stored in plain text.
 * They should be hashed on the backend. This is for demo purposes only.
 */
interface RegisteredUser extends User {
  password: string;
}

/**
 * LoginResult Interface
 * Returned by the login function to indicate success or failure
 * - success: true if login was successful, false otherwise
 * - error: Optional error type explaining why login failed
 *   - 'not_registered': User email doesn't exist in registered users
 *   - 'invalid_password': Email exists but password doesn't match
 */
interface LoginResult {
  success: boolean;
  error?: 'not_registered' | 'invalid_password';
}

/**
 * SignupResult Interface
 * Returned by the signup function to indicate success or failure
 * - success: true if signup was successful, false otherwise
 * - error: Optional error type explaining why signup failed
 *   - 'already_registered': Email already exists in registered users
 */
interface SignupResult {
  success: boolean;
  error?: 'already_registered';
}

/**
 * AuthContextType Interface
 * Defines the shape of the authentication context value
 * This is what components receive when they call useAuth()
 *
 * - user: Currently logged-in user (null if not logged in)
 * - isAuthenticated: Boolean flag for quick auth check
 * - isLoading: Boolean flag indicating if auth state is being loaded from storage
 * - registeredUsers: Array of all registered users (for reference)
 * - login: Function to authenticate existing user
 * - signup: Function to register new user
 * - logout: Function to clear current user session
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  registeredUsers: RegisteredUser[];
  login: (email: string, password: string) => Promise<LoginResult>;
  signup: (name: string, email: string, password: string) => Promise<SignupResult>;
  logout: () => void;
}

/**
 * Create the Auth Context
 * Initial value is undefined - will be provided by AuthProvider
 * The undefined check in useAuth() ensures components are within provider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProviderProps Interface
 * Props for the AuthProvider component
 * - children: React components that will have access to auth context
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Helper function to simulate API delay
 * In a real app, this would be replaced with actual API calls
 * Returns a Promise that resolves after specified milliseconds
 *
 * @param ms - Milliseconds to wait before resolving
 * @returns Promise<void> - Resolves after delay
 */
const delay = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

/**
 * AuthProvider Component
 *
 * This is the main provider component that:
 * 1. Maintains the authentication state (user, registeredUsers)
 * 2. Provides login, signup, and logout functions
 * 3. Wraps children with AuthContext.Provider
 *
 * USAGE: Wrap your App component with AuthProvider
 * Example:
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  /**
   * State: user
   * Stores the currently logged-in user
   * - null when no user is logged in
   * - Contains {name, email} when user is authenticated
   */
  const [user, setUser] = useState<User | null>(null);

  /**
   * State: registeredUsers
   * Array storing all registered users with their credentials
   * This acts as our "database" for this demo
   * In a real app, this would be stored on a backend server
   */
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  /**
   * State: isLoading
   * Indicates whether the app is loading persisted auth state from AsyncStorage
   * - true when app starts and is checking for saved session
   * - false once loading is complete
   * Used to show a loading screen while checking auth status
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Computed: isAuthenticated
   * Derived state that returns true if a user is logged in
   * Useful for conditional rendering in components
   */
  const isAuthenticated = user !== null;

  /**
   * Load persisted auth state from AsyncStorage on app start
   *
   * This effect runs once when the AuthProvider mounts.
   * It retrieves any saved user session and registered users from AsyncStorage,
   * allowing the user to remain logged in after closing and reopening the app.
   */
  useEffect(() => {
    const loadPersistedAuth = async () => {
      try {
        // Retrieve both user and registered users from storage in parallel
        const [savedUser, savedRegisteredUsers] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS),
        ]);

        // Parse and restore user if exists
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        // Parse and restore registered users if exists
        if (savedRegisteredUsers) {
          setRegisteredUsers(JSON.parse(savedRegisteredUsers));
        }
      } catch (error) {
        console.error('Error loading persisted auth state:', error);
      } finally {
        // Mark loading as complete regardless of success/failure
        setIsLoading(false);
      }
    };

    loadPersistedAuth();
  }, []);

  /**
   * LOGIN FUNCTION
   *
   * Authenticates a user with email and password
   *
   * FLOW:
   * 1. Simulate network delay (500ms)
   * 2. Search for user by email in registeredUsers array
   * 3. If user not found → return error 'not_registered'
   * 4. If password doesn't match → return error 'invalid_password'
   * 5. If credentials valid → set user state and return success
   *
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise<LoginResult> - Success status and optional error
   *
   * WHY useCallback?
   * - Memoizes the function to prevent unnecessary re-renders
   * - Only recreates when registeredUsers changes
   */
  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    try {
      // Simulate API call delay (in real app, this would be a fetch/axios call)
      await delay(500);

      // Find user by email (case-insensitive comparison)
      // Array.find() returns the first matching element or undefined
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      // Check if user exists in our "database"
      if (!existingUser) {
        // User not found - they need to register first
        return {success: false, error: 'not_registered'};
      }

      // Verify password matches
      // In real apps, passwords are hashed and compared securely on backend
      if (existingUser.password !== password) {
        return {success: false, error: 'invalid_password'};
      }

      // Authentication successful!
      // Update user state with logged-in user's info
      // Note: We don't store password in the user state (security)
      const loggedInUser = {
        name: existingUser.name,
        email: existingUser.email,
      };
      setUser(loggedInUser);

      // Persist user to AsyncStorage for session persistence
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedInUser));

      return {success: true};
    } catch (error) {
      // Handle any unexpected errors
      console.error('Login error:', error);
      return {success: false, error: 'not_registered'};
    }
  }, [registeredUsers]); // Dependency: recreate when registeredUsers changes

  /**
   * SIGNUP FUNCTION
   *
   * Registers a new user and automatically logs them in
   *
   * FLOW:
   * 1. Simulate network delay (500ms)
   * 2. Check if email already exists in registeredUsers
   * 3. If email exists → return error 'already_registered'
   * 4. If email is new → add user to registeredUsers array
   * 5. Auto-login the new user by setting user state
   * 6. Return success
   *
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's chosen password
   * @returns Promise<SignupResult> - Success status and optional error
   */
  const signup = useCallback(async (name: string, email: string, password: string): Promise<SignupResult> => {
    try {
      // Simulate API call delay
      await delay(500);

      // Check if user already exists (prevent duplicate registrations)
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        // Email already registered - user should login instead
        return {success: false, error: 'already_registered'};
      }

      // Create new user object with all required fields
      const newUser: RegisteredUser = {
        name,
        email,
        password, // In real apps, this would be hashed before storing
      };

      // Add new user to registeredUsers array
      // Using functional update to ensure we have latest state
      const updatedRegisteredUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedRegisteredUsers);

      // Auto-login: Set the current user (without password)
      const loggedInUser = {
        name,
        email,
      };
      setUser(loggedInUser);

      // Persist both registered users and current user to AsyncStorage
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedRegisteredUsers)),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedInUser)),
      ]);

      return {success: true};
    } catch (error) {
      console.error('Signup error:', error);
      return {success: false};
    }
  }, [registeredUsers]); // Dependency: recreate when registeredUsers changes

  /**
   * LOGOUT FUNCTION
   *
   * Clears the current user session
   * Sets user state to null and removes from AsyncStorage
   *
   * Note: registeredUsers is NOT cleared - users remain registered
   * This allows them to login again later
   */
  const logout = useCallback(async () => {
    setUser(null);
    // Remove user from AsyncStorage but keep registered users
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error clearing user from storage:', error);
    }
  }, []); // No dependencies - function never changes

  /**
   * Context Value Object
   * This object is provided to all children via Context
   * Contains all state and functions components need for auth
   */
  const value: AuthContextType = {
    user,              // Current logged-in user (or null)
    isAuthenticated,   // Quick boolean check for auth status
    isLoading,         // Loading state while checking persisted auth
    registeredUsers,   // List of all registered users
    login,             // Function to login existing user
    signup,            // Function to register new user
    logout,            // Function to logout current user
  };

  /**
   * Render the Provider
   * Wraps children with AuthContext.Provider
   * All descendants can now access auth state via useAuth()
   */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Custom Hook
 *
 * Provides easy access to authentication context from any component
 *
 * USAGE:
 *   const {user, login, logout, signup} = useAuth();
 *
 * THROWS: Error if used outside of AuthProvider
 * This ensures developers don't accidentally use auth in wrong context
 *
 * @returns AuthContextType - The complete auth context value
 */
export const useAuth = (): AuthContextType => {
  // Get context value using React's useContext hook
  const context = useContext(AuthContext);

  // Safety check: ensure component is within AuthProvider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// Default export for flexibility in imports
export default AuthContext;
