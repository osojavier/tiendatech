import { FaMoon, FaSun, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Header({ isDark, toggleTheme }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">TechStore</h1>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-800 dark:text-white flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaSignOutAlt className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              Login
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}