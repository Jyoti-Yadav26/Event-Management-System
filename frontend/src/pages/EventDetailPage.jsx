import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ArrowUpRight,
} from "lucide-react";
import EventCard from "../components/events/EventCard";

const DUMMY_EVENTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    category: "Cultural",
    title: "Skyline Music Festival",
    date: "Aug 24, 2026",
    time: "6:00 PM – 11:30 PM",
    location: "Marina Bay, Singapore",
    organizer: "Skyline Events Co.",
    seatsLeft: 42,
    description:
      "An evening of live performances against the Marina Bay skyline, featuring a curated lineup of local and international artists across three stages. Expect immersive sound design, ambient lighting installations, and a night market of local vendors. Doors open at 5:30 PM, with the main lineup beginning at 6:00 PM.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    category: "Tech",
    title: "Future Forward Tech Summit",
    date: "Sep 12, 2026",
    location: "Moscone Center, SF",
    seatsLeft: 18,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    category: "Seminar",
    title: "Founders & Frontiers Summit",
    date: "Sep 30, 2026",
    location: "The Shard, London",
    seatsLeft: 27,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    category: "Cultural",
    title: "Modern Light Art Exhibition",
    date: "Oct 6, 2026",
    location: "MoMA, New York",
    seatsLeft: 55,
  },
];

const EventDetailPage = () => {
  const { id } = useParams();
  const event =
    DUMMY_EVENTS.find((e) => String(e.id) === String(id)) || DUMMY_EVENTS[0];

  const similarEvents = DUMMY_EVENTS.filter((e) => e.id !== event.id).slice(
    0,
    3,
  );

  const details = [
    { icon: Calendar, label: "Date", value: event.date },
    { icon: Clock, label: "Time", value: event.time || "To be announced" },
    { icon: MapPin, label: "Location", value: event.location },
    { icon: User, label: "Organizer", value: event.organizer || "EventSphere" },
    {
      icon: Users,
      label: "Seats Remaining",
      value: `${event.seatsLeft} seats`,
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(31,31,31,0.12)]"
      >
        <img
          src={event.image}
          alt={event.title}
          className="h-72 w-full object-cover md:h-[28rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/70 via-[#1F1F1F]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 flex flex-col gap-3 p-8 md:p-12">
          <span className="w-fit rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#1F1F1F] backdrop-blur-sm">
            {event.category}
          </span>
          <h1 className="max-w-2xl font-['Playfair_Display'] text-3xl font-semibold leading-tight text-white md:text-5xl">
            {event.title}
          </h1>
        </div>
      </motion.section>

      {/* Details + Description */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Description */}
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
            {event.description ||
              "Join us for an unforgettable experience thoughtfully curated for attendees of all backgrounds. Full details for this event will be announced shortly — check back soon for updates."}
          </p>
        </motion.div>

        {/* Details card */}
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
                  <Icon
                    size={17}
                    strokeWidth={1.75}
                    className="text-[#1F1F1F]"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-[#1F1F1F]">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-4 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            Register Now
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </section>

      {/* Similar Events */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]">
            You May Also Like
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl font-semibold text-[#1F1F1F] md:text-4xl">
            Similar Events
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {similarEvents.map((similar, index) => (
            <EventCard key={similar.id} event={similar} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
