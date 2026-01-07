import React, {createContext, useContext, useState, useCallback, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: '@auth_user',
  REGISTERED_USERS: '@auth_registered_users',
};

interface User {
  name: string;
  email: string;
}

interface RegisteredUser extends User {
  password: string;
}

interface LoginResult {
  success: boolean;
  error?: 'not_registered' | 'invalid_password';
}

interface SignupResult {
  success: boolean;
  error?: 'already_registered';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  signup: (name: string, email: string, password: string) => Promise<SignupResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const delay = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const loadPersistedAuth = async () => {
      try {
        const [savedUser, savedRegisteredUsers] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS),
        ]);

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        if (savedRegisteredUsers) {
          setRegisteredUsers(JSON.parse(savedRegisteredUsers));
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    try {
      await delay(500);

      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!existingUser) {
        return {success: false, error: 'not_registered'};
      }

      if (existingUser.password !== password) {
        return {success: false, error: 'invalid_password'};
      }

      const loggedInUser = {
        name: existingUser.name,
        email: existingUser.email,
      };
      setUser(loggedInUser);

      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedInUser));

      return {success: true};
    } catch {
      return {success: false, error: 'not_registered'};
    }
  }, [registeredUsers]);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<SignupResult> => {
    try {
      await delay(500);

      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        return {success: false, error: 'already_registered'};
      }

      const newUser: RegisteredUser = {
        name,
        email,
        password,
      };

      const updatedRegisteredUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedRegisteredUsers);

      const loggedInUser = {
        name,
        email,
      };
      setUser(loggedInUser);

      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedRegisteredUsers)),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(loggedInUser)),
      ]);

      return {success: true};
    } catch {
      return {success: false};
    }
  }, [registeredUsers]);

  const logout = useCallback(async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch {
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
