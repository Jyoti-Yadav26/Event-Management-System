import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { login as loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setError('');
    setLoading(true);
    try {
      const authData = await loginApi(formData);
      login(authData);
      navigate('/');
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Login failed. Check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(31,31,31,0.08)] md:p-10"
      >
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] text-[#F8F7F5]">
            <LogIn size={20} strokeWidth={1.75} />
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#1F1F1F]">
            Welcome Back
          </h1>
          <p className="text-sm text-[#6B7280]">
            Sign in to your EventSphere account
          </p>
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <LoginForm onSubmit={handleLogin} loading={loading} />

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          New here?{' '}
          <Link
            to="/register"
            className="font-medium text-[#1F1F1F] transition-colors duration-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;