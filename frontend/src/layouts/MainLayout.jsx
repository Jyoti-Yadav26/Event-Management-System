import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#F8F7F5] font-['Inter'] text-[#1F1F1F] antialiased">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-[#E8E3DD]/60 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#E8E3DD]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[#FFFFFF]/40" />
      </div>

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24"
      >
        <Outlet />
      </motion.main>

      <footer className="border-t border-[#E8E3DD] px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#6B7280] md:flex-row">
          <span className="font-['Playfair_Display'] text-lg text-[#1F1F1F]">
            EventSphere
          </span>
          <span>
            &copy; {new Date().getFullYear()} EventSphere. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
