import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordCredentials, AuthError } from '../types/auth';

export function ResetPassword() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<ResetPasswordCredentials>({
    email: '',
  });
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simulate API call - replace with actual API integration
    try {
      // Simulating successful password reset request
      setSuccess(true);
    } catch (err) {
      setError({ message: 'Failed to send reset email. Please try again.' });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Check Your Email</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If an account exists with the email you provided, you will receive password reset instructions.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Reset Password</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Reset Instructions
          </button>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}