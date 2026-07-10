import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  ShieldCheck,
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CalendarX,
} from 'lucide-react';
import EventFilters from '../components/events/EventFilters';
import EventList from '../components/events/EventList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { eventApi } from '../api/eventApi';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
import { getRoleHomePath } from '../utils/helpers';

const FEATURES = [
  {
    icon: CalendarCheck,
    title: 'Easy Registration',
    description:
      'Reserve your seat in a few taps, no clutter, no confusion, just a fast and simple checkout.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description:
      'Your data and payments are protected end-to-end, so you can register with complete confidence.',
  },
  {
    icon: Compass,
    title: 'Discover Great Events',
    description:
      'From intimate gatherings to major festivals, find experiences curated to match your interests.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const PAGE_SIZE = 9;

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state?.scrollTo === 'events') {
      requestAnimationFrame(() => scrollToEvents());
    }
  }, [location.state]);

  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await eventApi.getAll({
          title: searchTerm.trim() || undefined,
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          page,
          size: PAGE_SIZE,
        });

        if (cancelled) return;

        if (response.success) {
          setEvents(response.data.content);
          setTotalPages(response.data.totalPages);
        } else {
          setEvents([]);
          setTotalPages(0);
          setError(response.message || 'Failed to load events.');
        }
      } catch (err) {
        if (cancelled) return;
        setEvents([]);
        setTotalPages(0);
        setError(err.response?.data?.message || 'Failed to load events.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadEvents();
    return () => {
      cancelled = true;
    };
  }, [searchTerm, selectedCategory, page]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(0);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setPage(0);
  };

  const handleExploreEvents = () => {
    if (location.pathname === '/') {
      scrollToEvents();
      return;
    }
    navigate('/', { state: { scrollTo: 'events' } });
  };

  const createEventPath = !isAuthenticated
    ? '/register'
    : user?.role === ROLES.ORGANIZER
      ? '/organizer/create'
      : getRoleHomePath(user?.role);

  const getStartedPath = isAuthenticated ? '/' : '/register';

  return (
    <div className="flex flex-col gap-32">
      <section className="flex flex-col items-center gap-8 pt-8 text-center md:pt-16">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-full bg-[#E8E3DD]/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]"
        >
          Curated experiences, everywhere
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="max-w-3xl font-['Playfair_Display'] text-5xl font-semibold leading-[1.1] tracking-tight text-[#1F1F1F] md:text-7xl"
        >
          Discover Amazing Events
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="max-w-xl text-lg leading-relaxed text-[#6B7280]"
        >
          From music festivals to tech summits, explore handpicked events near
          you, or bring your own vision to life on EventSphere.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={handleExploreEvents}
            className="group flex items-center gap-2 rounded-full bg-[#1F1F1F] px-7 py-3.5 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore Events
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <Link
            to={createEventPath}
            className="rounded-full border border-[#E8E3DD] bg-white px-7 py-3.5 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F] hover:-translate-y-0.5"
          >
            Create Event
          </Link>
        </motion.div>
      </section>

      <section id="events" className="flex scroll-mt-28 flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]"
          >
            Browse
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F] md:text-5xl"
          >
            Upcoming Events
          </motion.h2>
        </div>

        <EventFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {error && (
          <div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Loading events..." />
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-8 py-24 text-center shadow-[0_2px_12px_rgba(31,31,31,0.06)]">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F7F5]">
              <CalendarX size={28} strokeWidth={1.5} className="text-[#6B7280]" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1F1F1F]">
                No events found
              </h3>
              <p className="text-sm text-[#6B7280]">
                Try adjusting your search or category filter.
              </p>
            </div>
          </div>
        ) : (
          <>
            <EventList events={events} />

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1 rounded-full border border-[#E8E3DD] px-4 py-2 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} strokeWidth={1.75} />
                  Previous
                </button>
                <span className="text-sm text-[#6B7280]">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={page >= totalPages - 1}
                  className="flex items-center gap-1 rounded-full border border-[#E8E3DD] px-4 py-2 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="flex flex-col gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]"
          >
            Why EventSphere
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F] md:text-5xl"
          >
            Built for a Better Experience
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-start gap-5 rounded-3xl bg-white p-8 shadow-[0_2px_12px_rgba(31,31,31,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(31,31,31,0.1)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F7F5]">
                  <Icon size={24} strokeWidth={1.5} className="text-[#1F1F1F]" />
                </span>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1F1F1F]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6B7280]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 rounded-[2.5rem] bg-[#1F1F1F] px-8 py-20 text-center md:px-16"
        >
          <h2 className="max-w-2xl font-['Playfair_Display'] text-4xl font-semibold leading-tight text-[#F8F7F5] md:text-5xl">
            Your Next Great Event Starts Here
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-[#E8E3DD]/80">
            Join thousands of attendees and organizers building unforgettable
            experiences on EventSphere.
          </p>
          <Link
            to={getStartedPath}
            className="group flex items-center gap-2 rounded-full bg-[#F8F7F5] px-8 py-3.5 text-sm font-medium text-[#1F1F1F] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
