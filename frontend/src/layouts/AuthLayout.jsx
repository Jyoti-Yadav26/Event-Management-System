import { motion } from 'framer-motion';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F8F7F5] font-['Inter'] text-[#1F1F1F] antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-[#E8E3DD]/60 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#E8E3DD]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[#FFFFFF]/40" />
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-8 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="EventSphere home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F1F1F] text-[#F8F7F5] transition-transform duration-300 group-hover:rotate-12">
            <Sparkles size={16} strokeWidth={1.75} />
          </span>
          <span className="font-['Playfair_Display'] text-2xl font-semibold tracking-tight text-[#1F1F1F]">
            EventSphere
          </span>
        </Link>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-7xl flex-1 px-4 pb-12 sm:px-6 md:px-10"
        role="main"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AuthLayout;
