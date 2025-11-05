import type { User } from './storage';

const HARDCODED_CREDENTIALS = {
  email: 'contact@tapp.work',
  password: 'qwerty',
} as const;

export function validateLogin(email: string, password: string): boolean {
  return (
    email.toLowerCase().trim() === HARDCODED_CREDENTIALS.email.toLowerCase() &&
    password === HARDCODED_CREDENTIALS.password
  );
}

export function validateSignup(userData: User): boolean {
  // Basic validation - check required fields are present
  return (
    !!userData.email &&
    !!userData.fullName &&
    !!userData.password &&
    userData.email.trim().length > 0 &&
    userData.fullName.trim().length > 0 &&
    userData.password.trim().length > 0
  );
}

export function simulateAsyncDelay(): Promise<void> {
  // Simulate async operation with 2-3 second delay
  const delay = Math.random() * 1000 + 2000; // 2000-3000ms
  return new Promise(resolve => setTimeout(resolve, delay));
}
