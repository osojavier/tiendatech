import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, AuthError } from '../types/auth';
import { validateLoginForm } from '../utils/auth';

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<AuthError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateLoginForm(credentials.email, credentials.password);

    if (validationError) {
      setError(validationError);
      return;
    }

    // Simulate API call - replace with actual API integration
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      login({
        id: '1',
        email: credentials.email,
        name: 'Demo User',
      });
      navigate('/');
    } else {
      setError({ message: 'Invalid email or password' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <button
              type="button"
              onClick={() => navigate('/reset-password')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}