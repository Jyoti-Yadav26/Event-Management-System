import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive ? "text-[#1F1F1F]" : "text-[#6B7280] hover:text-[#1F1F1F]"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F1F1F] text-[#F8F7F5] transition-transform duration-300 group-hover:rotate-12">
            <Sparkles size={16} strokeWidth={1.75} />
          </span>
          <span className="font-['Playfair_Display'] text-2xl font-semibold tracking-tight text-[#1F1F1F]">
            EventSphere
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-10 font-['Inter']">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {({ isActive }) => (
                <span className="group inline-flex flex-col items-center">
                  {link.label}
                  <span
                    className={`mt-1 h-[1.5px] w-full origin-left scale-x-0 bg-[#1F1F1F] transition-transform duration-300 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : ""
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}

          <div className="flex items-center gap-4 pl-4">
            <NavLink
              to="/login"
              className="text-sm font-medium text-[#6B7280] transition-colors duration-300 hover:text-[#1F1F1F]"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="rounded-full bg-[#1F1F1F] px-5 py-2.5 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Register
            </NavLink>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#1F1F1F] transition-colors duration-300 hover:bg-[#E8E3DD] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={22} strokeWidth={1.75} />
          ) : (
            <Menu size={22} strokeWidth={1.75} />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#E8E3DD] bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6 font-['Inter']">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? "bg-[#F8F7F5] text-[#1F1F1F]"
                          : "text-[#6B7280] hover:bg-[#F8F7F5] hover:text-[#1F1F1F]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-[#E8E3DD] pt-4">
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-3 py-3 text-center text-base font-medium text-[#1F1F1F] transition-colors duration-300 hover:bg-[#F8F7F5]"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-[#1F1F1F] px-3 py-3 text-center text-base font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  Register
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
