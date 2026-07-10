import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ErrorAlert from '../common/ErrorAlert';
import LoadingSpinner from '../common/LoadingSpinner';
import { ROLES } from '../../utils/constants';
import { getApiErrorMessage, getValidationErrors } from '../../utils/helpers';

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.ATTENDEE,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors(null);

    try {
      const response = await register(formData);
      if (response.success) {
        navigate('/');
        return;
      }
      setError(response.message || 'Registration failed');
    } catch (err) {
      setError(getApiErrorMessage(err));
      setFieldErrors(getValidationErrors(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Creating your account..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Create account</h1>
        <p className="mt-1 text-sm text-slate-400">Join as an organizer or attendee</p>
      </div>

      <ErrorAlert message={error} fieldErrors={fieldErrors} />

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Jyoti Rai"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-slate-300">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value={ROLES.ATTENDEE}>Attendee — browse and register for events</option>
            <option value={ROLES.ORGANIZER}>Organizer — create and manage events</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        Create account
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
