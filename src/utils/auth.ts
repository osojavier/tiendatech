import { AuthError } from '../types/auth';

export const validateLoginForm = (email: string, password: string): AuthError | null => {
  if (!email) return { message: 'Email is required', field: 'email' };
  if (!password) return { message: 'Password is required', field: 'password' };
  return null;
};

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): AuthError | null => {
  if (!name) return { message: 'Name is required', field: 'name' };
  if (!email) return { message: 'Email is required', field: 'email' };
  if (!password) return { message: 'Password is required', field: 'password' };
  if (password !== confirmPassword) {
    return { message: 'Passwords do not match', field: 'confirmPassword' };
  }
  return null;
};