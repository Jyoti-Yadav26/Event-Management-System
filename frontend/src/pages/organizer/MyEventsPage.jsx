import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Pencil,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  CalendarX,
} from 'lucide-react';
import { getMyEvents, deleteEvent } from '../../api/eventApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { formatDate, formatTime } from '../../utils/helpers';

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getMyEvents({ size: 50 });
      if (response.success) {
        setEvents(response.data.content);
      } else {
        setEvents([]);
        setError(response.message || 'Failed to load your events.');
      }
    } catch (err) {
      setEvents([]);
      setError(err.response?.data?.message || 'Failed to load your events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    setDeletingId(id);
    setError('');

    try {
      const response = await deleteEvent(id);
      if (response.success) {
        setEvents((prev) => prev.filter((event) => event.id !== id));
      } else {
        setError(response.message || 'Failed to delete the event.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete the event.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]">
            Organizer Dashboard
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F] md:text-5xl">
            My Events
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate('/organizer/create')}
          className="flex items-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-3.5 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
        >
          <Plus size={16} strokeWidth={2} />
          Create Event
        </button>
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
        <LoadingSpinner message="Loading your events..." />
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-8 py-24 text-center shadow-[0_2px_12px_rgba(31,31,31,0.06)]">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8F7F5]">
            <CalendarX size={28} strokeWidth={1.5} className="text-[#6B7280]" />
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#1F1F1F]">
              No events yet.
            </h3>
            <p className="text-sm text-[#6B7280]">
              Create your first event to get started.
            </p>
          </div>
          <Link
            to="/organizer/create"
            className="flex items-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-3 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Plus size={16} strokeWidth={2} />
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
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
                      {event.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#F8F7F5] px-3 py-1 text-xs font-medium text-[#1F1F1F]">
                      {event.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} strokeWidth={1.75} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={15} strokeWidth={1.75} />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={15} strokeWidth={1.75} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={15} strokeWidth={1.75} />
                      <span>
                        {event.availableSeats} / {event.maxSeats} seats available
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3 border-t border-[#E8E3DD] pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/organizer/edit/${event.id}`)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E8E3DD] bg-white px-4 py-2.5 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F]"
                    >
                      <Pencil size={14} strokeWidth={1.75} />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id)}
                      disabled={deletingId === event.id}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-4 py-2.5 text-sm font-medium text-[#F8F7F5] transition-all duration-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === event.id ? (
                        <Loader2 size={14} strokeWidth={1.75} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} strokeWidth={1.75} />
                      )}
                      Delete
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

export default MyEventsPage;
