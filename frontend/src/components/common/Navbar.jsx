import { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const GUEST_LINKS = [{ label: 'Home', to: '/' }];

const ATTENDEE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'My Registrations', to: '/attendee/my-registrations' },
];

const ORGANIZER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'My Events', to: '/organizer/my-events' },
  { label: 'Create Event', to: '/organizer/create' },
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = useMemo(() => {
    if (!isAuthenticated) return GUEST_LINKS;
    if (user?.role === ROLES.ORGANIZER) return ORGANIZER_LINKS;
    if (user?.role === ROLES.ATTENDEE) return ATTENDEE_LINKS;
    return GUEST_LINKS;
  }, [isAuthenticated, user?.role]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive ? 'text-[#1F1F1F]' : 'text-[#6B7280] hover:text-[#1F1F1F]'
    }`;

  const renderNavLink = (link) => (
    <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setIsOpen(false)}>
      {({ isActive }) => (
        <span className="group inline-flex flex-col items-center">
          {link.label}
          <span
            className={`mt-1 h-[1.5px] w-full origin-left scale-x-0 bg-[#1F1F1F] transition-transform duration-300 group-hover:scale-x-100 ${
              isActive ? 'scale-x-100' : ''
            }`}
          />
        </span>
      )}
    </NavLink>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setIsOpen(false)}
          aria-label="EventSphere home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F1F1F] text-[#F8F7F5] transition-transform duration-300 group-hover:rotate-12">
            <Sparkles size={16} strokeWidth={1.75} />
          </span>
          <span className="font-['Playfair_Display'] text-2xl font-semibold tracking-tight text-[#1F1F1F]">
            EventSphere
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex md:items-center md:gap-8 font-['Inter']">
          {navLinks.map(renderNavLink)}

          <div className="flex items-center gap-4 border-l border-[#E8E3DD] pl-6">
            {isAuthenticated ? (
              <>
                {user?.name && (
                  <span className="text-sm font-medium text-[#1F1F1F]" aria-label="Logged in as">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full border border-[#E8E3DD] px-4 py-2 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F]"
                  aria-label="Logout"
                >
                  <LogOut size={15} strokeWidth={1.75} />
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#1F1F1F] transition-colors duration-300 hover:bg-[#E8E3DD] md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
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
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[#E8E3DD] bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6 font-['Inter']">
              {isAuthenticated && user?.name && (
                <p className="mb-2 px-3 text-sm font-medium text-[#1F1F1F]">
                  Hi, {user.name}
                </p>
              )}

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#F8F7F5] text-[#1F1F1F]'
                          : 'text-[#6B7280] hover:bg-[#F8F7F5] hover:text-[#1F1F1F]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-[#E8E3DD] pt-4">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-full border border-[#E8E3DD] px-3 py-3 text-base font-medium text-[#1F1F1F] transition-colors duration-300 hover:bg-[#F8F7F5]"
                  >
                    <LogOut size={16} strokeWidth={1.75} />
                    Logout
                  </button>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
