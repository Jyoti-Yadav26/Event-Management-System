import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatDisplayDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatDisplayTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const EventCard = ({ event }) => {
  const isFull = event.availableSeats <= 0;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg backdrop-blur"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <Link
          to={`/events/${event.id}`}
          className="text-lg font-semibold text-white transition hover:text-indigo-400"
        >
          {event.title}
        </Link>
        <span className="shrink-0 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
          {event.category}
        </span>
      </div>

      <div className="mb-6 space-y-2.5 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span>{formatDisplayDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-500" />
          <span>{formatDisplayTime(event.time)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-500" />
          <span>
            {event.availableSeats} / {event.maxSeats} seats available
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={isFull}
        className="mt-auto w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        {isFull ? 'Event Full' : 'Register'}
      </button>
    </motion.article>
  );
};

export default EventCard;
