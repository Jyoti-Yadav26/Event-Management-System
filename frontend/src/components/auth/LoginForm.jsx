import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { login as loginApi } from '../../api/authApi';
import ErrorAlert from '../common/ErrorAlert';
import { getApiErrorMessage, getValidationErrors, getPostLoginPath } from '../../utils/helpers';

const LoginForm = () => {
  const { login: setAuthSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors(null);

    try {
      const response = await loginApi(formData);
      if (response.success) {
        const { token, email, name, role } = response.data;
        setAuthSession({
          token,
          user: { email, name, role },
        });

        const from = location.state?.from?.pathname;
        navigate(getPostLoginPath(role, from), { replace: true });
        return;
      }
      setError(response.message || 'Login failed.');
    } catch (err) {
      setError(getApiErrorMessage(err));
      setFieldErrors(getValidationErrors(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <ErrorAlert message={error} fieldErrors={fieldErrors} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Email
        </label>
        <div className="relative">
          <Mail
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-transparent bg-[#F8F7F5] py-3.5 pl-11 pr-4 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:border-[#1F1F1F]/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Password
        </label>
        <div className="relative">
          <Lock
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="Enter your password"
            className="w-full rounded-2xl border border-transparent bg-[#F8F7F5] py-3.5 pl-11 pr-11 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:border-[#1F1F1F]/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition-colors duration-300 hover:text-[#1F1F1F]"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.75} />
            ) : (
              <Eye size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-4 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
