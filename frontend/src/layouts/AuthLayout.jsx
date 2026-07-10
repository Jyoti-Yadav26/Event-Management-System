import { motion } from 'framer-motion';
import { Outlet, Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 text-white">
          <CalendarDays className="h-7 w-7 text-indigo-400" />
          <span className="text-xl font-semibold tracking-tight">EventHub</span>
        </Link>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
