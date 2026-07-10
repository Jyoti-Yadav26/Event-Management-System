import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ChevronDown,
} from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ATTENDEE",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...payload } = formData;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Full Name
        </label>
        <div className="relative">
          <User
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            type="text"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            placeholder="Jane Doe"
            className={`w-full rounded-2xl border bg-[#F8F7F5] py-3.5 pl-11 pr-4 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10 ${
              fieldErrors.fullName
                ? "border-red-300"
                : "border-transparent focus:border-[#1F1F1F]/20"
            }`}
          />
        </div>
        {fieldErrors.fullName && (
          <span className="text-xs text-red-500">{fieldErrors.fullName}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Email
        </label>
        <div className="relative">
          <Mail
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className={`w-full rounded-2xl border bg-[#F8F7F5] py-3.5 pl-11 pr-4 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10 ${
              fieldErrors.email
                ? "border-red-300"
                : "border-transparent focus:border-[#1F1F1F]/20"
            }`}
          />
        </div>
        {fieldErrors.email && (
          <span className="text-xs text-red-500">{fieldErrors.email}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Password
        </label>
        <div className="relative">
          <Lock
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            placeholder="At least 6 characters"
            className={`w-full rounded-2xl border bg-[#F8F7F5] py-3.5 pl-11 pr-11 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10 ${
              fieldErrors.password
                ? "border-red-300"
                : "border-transparent focus:border-[#1F1F1F]/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition-colors duration-300 hover:text-[#1F1F1F]"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.75} />
            ) : (
              <Eye size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <span className="text-xs text-red-500">{fieldErrors.password}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Confirm Password
        </label>
        <div className="relative">
          <Lock
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder="Re-enter your password"
            className={`w-full rounded-2xl border bg-[#F8F7F5] py-3.5 pl-11 pr-11 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10 ${
              fieldErrors.confirmPassword
                ? "border-red-300"
                : "border-transparent focus:border-[#1F1F1F]/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition-colors duration-300 hover:text-[#1F1F1F]"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff size={18} strokeWidth={1.75} />
            ) : (
              <Eye size={18} strokeWidth={1.75} />
            )}
          </button>
        </div>
        {fieldErrors.confirmPassword && (
          <span className="text-xs text-red-500">
            {fieldErrors.confirmPassword}
          </span>
        )}
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Role
        </label>
        <div className="relative">
          <select
            value={formData.role}
            onChange={handleChange("role")}
            className="w-full appearance-none rounded-2xl border border-transparent bg-[#F8F7F5] py-3.5 pl-4 pr-10 text-sm text-[#1F1F1F] transition-colors duration-300 focus:border-[#1F1F1F]/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10"
          >
            <option value="ATTENDEE">Attendee</option>
            <option value="ORGANIZER">Organizer</option>
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.75}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
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
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
