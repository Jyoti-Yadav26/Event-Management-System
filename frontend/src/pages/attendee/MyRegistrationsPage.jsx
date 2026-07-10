import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  CalendarCheck,
  ArrowUpRight,
  XCircle,
  Loader2,
  AlertCircle,
  CalendarX,
} from 'lucide-react';
import { getMyRegistrations, cancelRegistration } from '../../api/registrationApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate, formatDateTime } from '../../utils/helpers';

const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getMyRegistrations();
      if (response.success) {
        setRegistrations(response.data);
      } else {
        setRegistrations([]);
        setError(response.message || 'Failed to load your registrations.');
      }
    } catch (err) {
      setRegistrations([]);
      setError(err.response?.data?.message || 'Failed to load your registrations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleCancel = async (eventId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) return;

    setCancellingId(eventId);
    setError('');

    try {
      const response = await cancelRegistration(eventId);
      if (response.success) {
        setRegistrations((prev) =>
          prev.filter((registration) => registration.eventId !== eventId),
        );
      } else {
        setError(response.message || 'Failed to cancel the registration.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel the registration.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]">
          Attendee Dashboard
        </span>
        <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F] md:text-5xl">
          My Registrations
        </h1>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
          {error}
        </motion.div>
      )}

      {loading ? (
        <LoadingSpinner message="Loading your registrations..." />
      ) : registrations.length === 0 ? (
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-8 py-24 text-center shadow-[0_2px_12px_rgba(31,31,31,0.06)]">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F7F5]">
            <CalendarX size={28} strokeWidth={1.5} className="text-[#6B7280]" />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1F1F1F]">
              No registered events yet.
            </h3>
            <p className="text-sm text-[#6B7280]">
              Explore upcoming events and reserve your seat.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-3 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {registrations.map((registration, index) => (
              <motion.div
                key={registration.registrationId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_12px_rgba(31,31,31,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(31,31,31,0.12)]"
              >
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold leading-snug text-[#1F1F1F]">
                      {registration.eventTitle}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#F8F7F5] px-3 py-1 text-xs font-medium text-[#1F1F1F]">
                      <CalendarCheck size={13} strokeWidth={1.75} />
                      Registered
                    </span>
                  </div>

                  <span className="w-fit rounded-full bg-[#F8F7F5] px-3 py-1 text-xs font-medium text-[#1F1F1F]">
                    {registration.category}
                  </span>

                  <div className="flex flex-col gap-2.5 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} strokeWidth={1.75} />
                      <span>{formatDate(registration.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={15} strokeWidth={1.75} />
                      <span>{registration.location}</span>
                    </div>
                  </div>

                  <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    Registered on {formatDateTime(registration.registeredAt)}
                  </span>

                  <div className="mt-2 flex items-center gap-3 border-t border-[#E8E3DD] pt-4">
                    <Link
                      to={`/events/${registration.eventId}`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E8E3DD] bg-white px-4 py-2.5 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F]"
                    >
                      View Details
                      <ArrowUpRight size={14} strokeWidth={1.75} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleCancel(registration.eventId)}
                      disabled={cancellingId === registration.eventId}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-4 py-2.5 text-sm font-medium text-[#F8F7F5] transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {cancellingId === registration.eventId ? (
                        <Loader2 size={14} strokeWidth={1.75} className="animate-spin" />
                      ) : (
                        <XCircle size={14} strokeWidth={1.75} />
                      )}
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyRegistrationsPage;
