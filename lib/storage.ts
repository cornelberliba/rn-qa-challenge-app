import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ONBOARDING_COMPLETE: 'onboardingComplete',
  USER: 'user',
  FORCE_ONBOARDING_ON_LOGOUT: 'forceOnboardingOnLogout',
} as const;

export interface User {
  email: string;
  fullName: string;
  password: string; // Mock - for testing only
}

// Onboarding
export async function getOnboardingComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return value === 'true';
  } catch (error) {
    console.error('Error getting onboarding complete:', error);
    return false;
  }
}

export async function setOnboardingComplete(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
  } catch (error) {
    console.error('Error setting onboarding complete:', error);
    throw error;
  }
}

// User
export async function getUser(): Promise<User | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    if (value) {
      return JSON.parse(value) as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function saveUser(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

export async function clearUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error clearing user:', error);
    throw error;
  }
}

// Force Onboarding on Logout
export async function getForceOnboardingOnLogout(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.FORCE_ONBOARDING_ON_LOGOUT);
    return value === 'true';
  } catch (error) {
    console.error('Error getting force onboarding on logout:', error);
    return false;
  }
}

export async function setForceOnboardingOnLogout(value: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FORCE_ONBOARDING_ON_LOGOUT, value ? 'true' : 'false');
  } catch (error) {
    console.error('Error setting force onboarding on logout:', error);
    throw error;
  }
}

// Utility: Clear all app data (for testing)
export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ONBOARDING_COMPLETE,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.FORCE_ONBOARDING_ON_LOGOUT,
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
}
