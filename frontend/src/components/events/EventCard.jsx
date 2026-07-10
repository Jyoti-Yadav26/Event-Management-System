import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/helpers';

const EventCard = ({ event, index = 0 }) => {
  const isFull = event.availableSeats <= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_12px_rgba(31,31,31,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(31,31,31,0.12)]"
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/events/${event.id}`}
            className="font-['Playfair_Display'] text-xl font-semibold leading-snug text-[#1F1F1F] transition-colors duration-300 hover:text-[#6B7280]"
          >
            {event.title}
          </Link>
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

        <Link
          to={`/events/${event.id}`}
          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            isFull
              ? 'cursor-not-allowed bg-[#F8F7F5] text-[#6B7280]'
              : 'bg-[#1F1F1F] text-[#F8F7F5] shadow-sm hover:-translate-y-0.5 hover:shadow-md'
          }`}
          aria-disabled={isFull}
          onClick={(e) => isFull && e.preventDefault()}
        >
          {isFull ? 'Event Full' : 'View Details'}
          {!isFull && (
            <ArrowUpRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </Link>
      </div>
    </motion.article>
  );
};

export default EventCard;
