import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import RegisterForm from "../components/auth/RegisterForm";
import { register as registerApi } from "../api/authApi";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await registerApi(formData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating your account.",
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
            <Sparkles size={20} strokeWidth={1.75} />
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold text-[#1F1F1F]">
            Create Account
          </h1>
          <p className="text-sm text-[#6B7280]">
            Join EventSphere to discover and host events
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600"
          >
            <CheckCircle2 size={16} strokeWidth={1.75} className="shrink-0" />
            Account created successfully. Redirecting to login...
          </motion.div>
        )}

        <RegisterForm onSubmit={handleRegister} loading={loading} />

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#1F1F1F] transition-colors duration-300 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
