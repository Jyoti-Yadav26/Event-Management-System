import { motion } from "framer-motion";
import { CalendarCheck, ShieldCheck, Compass, ArrowRight } from "lucide-react";
import EventCard from "../components/events/EventCard";

const DUMMY_EVENTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    category: "Music",
    title: "Skyline Music Festival",
    date: "Aug 24, 2026",
    location: "Marina Bay, Singapore",
    seatsLeft: 42,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    category: "Technology",
    title: "Future Forward Tech Summit",
    date: "Sep 12, 2026",
    location: "Moscone Center, SF",
    seatsLeft: 18,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    category: "Business",
    title: "Founders & Frontiers Summit",
    date: "Sep 30, 2026",
    location: "The Shard, London",
    seatsLeft: 27,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    category: "Art & Culture",
    title: "Modern Light Art Exhibition",
    date: "Oct 6, 2026",
    location: "MoMA, New York",
    seatsLeft: 55,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200&auto=format&fit=crop",
    category: "Food & Drink",
    title: "The Culinary Collective",
    date: "Oct 18, 2026",
    location: "Napa Valley, CA",
    seatsLeft: 12,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
    category: "Sports",
    title: "Coastal Marathon Championship",
    date: "Nov 2, 2026",
    location: "Santa Monica, CA",
    seatsLeft: 84,
  },
];

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Easy Registration",
    description:
      "Reserve your seat in a few taps, no clutter, no confusion, just a fast and simple checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Your data and payments are protected end-to-end, so you can register with complete confidence.",
  },
  {
    icon: Compass,
    title: "Discover Great Events",
    description:
      "From intimate gatherings to major festivals, find experiences curated to match your interests.",
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

const HomePage = () => {
  return (
    <div className="flex flex-col gap-32">
      {/* Hero Section */}
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
          <button className="group flex items-center gap-2 rounded-full bg-[#1F1F1F] px-7 py-3.5 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            Explore Events
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button className="rounded-full border border-[#E8E3DD] bg-white px-7 py-3.5 text-sm font-medium text-[#1F1F1F] transition-all duration-300 hover:border-[#1F1F1F] hover:-translate-y-0.5">
            Create Event
          </button>
        </motion.div>
      </section>

      {/* Featured Events */}
      <section className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.15em] text-[#6B7280]"
          >
            Featured
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F] md:text-5xl"
          >
            Events You Won't Want to Miss
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {DUMMY_EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Why Choose EventSphere */}
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
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-start gap-5 rounded-3xl bg-white p-8 shadow-[0_2px_12px_rgba(31,31,31,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(31,31,31,0.1)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F7F5]">
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#1F1F1F]"
                  />
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

      {/* Call To Action */}
      <section className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
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
          <button className="group flex items-center gap-2 rounded-full bg-[#F8F7F5] px-8 py-3.5 text-sm font-medium text-[#1F1F1F] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            Get Started
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
