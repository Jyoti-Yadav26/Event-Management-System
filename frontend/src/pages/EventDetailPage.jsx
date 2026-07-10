import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ArrowUpRight,
  Loader2,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { getEventById } from '../api/eventApi';
import {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
} from '../api/registrationApi';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDateLong, formatTime } from '../utils/helpers';

const EventDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');

  const isAttendee = isAuthenticated && user?.role === ROLES.ATTENDEE;

  const checkRegistrationStatus = useCallback(async () => {
    if (!isAttendee) {
      setIsRegistered(false);
      return;
    }

    try {
      const response = await getMyRegistrations();
      if (response.success) {
        const registered = response.data.some(
          (registration) => String(registration.eventId) === String(id),
        );
        setIsRegistered(registered);
      }
    } catch {
      setIsRegistered(false);
    }
  }, [id, isAttendee]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getEventById(id);
        if (response.success) {
          setEvent(response.data);
        } else {
          setEvent(null);
          setError(response.message || 'Event not found.');
        }
      } catch (err) {
        setEvent(null);
        setError(err.response?.data?.message || 'Event not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event) {
      checkRegistrationStatus();
    }
  }, [event, checkRegistrationStatus]);

  const handleRegister = async () => {
    setActionLoading(true);
    setActionError('');

    try {
      const response = await registerForEvent(id);
      if (response.success) {
        setIsRegistered(true);
        setEvent((prev) =>
          prev
            ? { ...prev, availableSeats: Math.max(0, prev.availableSeats - 1) }
            : prev,
        );
      } else {
        setActionError(response.message || 'Registration failed.');
      }
    } catch (err) {
      setActionError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!window.confirm('Are you sure you want to cancel your registration?')) return;

    setActionLoading(true);
    setActionError('');

    try {
      const response = await cancelRegistration(id);
      if (response.success) {
        setIsRegistered(false);
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                availableSeats: Math.min(prev.maxSeats, prev.availableSeats + 1),
              }
            : prev,
        );
      } else {
        setActionError(response.message || 'Failed to cancel registration.');
      }
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to cancel registration.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading event details..." />;
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-8 py-24 text-center shadow-[0_2px_12px_rgba(31,31,31,0.06)]">
        <AlertCircle size={32} strokeWidth={1.5} className="text-red-400" />
        <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1F1F1F]">
          Event Not Found
        </h2>
        <p className="text-sm text-[#6B7280]">{error || 'This event does not exist.'}</p>
      </div>
    );
  }

  const isFull = event.availableSeats <= 0;
  const details = [
    { icon: Calendar, label: 'Date', value: formatDateLong(event.date) },
    { icon: Clock, label: 'Time', value: formatTime(event.time) },
    { icon: MapPin, label: 'Location', value: event.location },
    { icon: User, label: 'Organizer', value: event.organizerName },
    {
      icon: Users,
      label: 'Seats Remaining',
      value: `${event.availableSeats} of ${event.maxSeats} available`,
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1F1F1F] to-[#3D3D3D] shadow-[0_20px_50px_rgba(31,31,31,0.12)]"
      >
        <div className="flex h-72 flex-col justify-end p-8 md:h-[28rem] md:p-12">
          <span className="mb-3 w-fit rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#1F1F1F] backdrop-blur-sm">
            {event.category}
          </span>
          <h1 className="max-w-2xl font-['Playfair_Display'] text-3xl font-semibold leading-tight text-white md:text-5xl">
            {event.title}
          </h1>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-[0_2px_12px_rgba(31,31,31,0.06)] lg:col-span-2"
        >
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1F1F1F]">
            About This Event
          </h2>
          <p className="text-base leading-relaxed text-[#6B7280]">
            {event.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0_2px_12px_rgba(31,31,31,0.06)]"
        >
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1F1F1F]">
            Event Details
          </h3>

          <div className="flex flex-col gap-5">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F7F5]">
                  <Icon size={17} strokeWidth={1.75} className="text-[#1F1F1F]" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-[#1F1F1F]">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {actionError && (
            <div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
              {actionError}
            </div>
          )}

          {isAttendee && (
            <>
              {isRegistered ? (
                <button
                  type="button"
                  onClick={handleCancelRegistration}
                  disabled={actionLoading}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[#E8E3DD] bg-white px-6 py-4 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading ? (
                    <Loader2 size={16} strokeWidth={2} className="animate-spin" />
                  ) : (
                    <XCircle size={16} strokeWidth={2} />
                  )}
                  Cancel Registration
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={actionLoading || isFull}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-4 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {actionLoading ? (
                    <Loader2 size={16} strokeWidth={2} className="animate-spin" />
                  ) : (
                    <>
                      {isFull ? 'Event Full' : 'Register Now'}
                      {!isFull && (
                        <ArrowUpRight
                          size={16}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      )}
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default EventDetailPage;
