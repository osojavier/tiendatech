import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ResetPassword } from './components/ResetPassword';
import { PrivateRoute } from './components/PrivateRoute';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-3">
                    <ProductGrid products={products} />
                  </div>
                  <div className="lg:col-span-1">
                    <Cart />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;