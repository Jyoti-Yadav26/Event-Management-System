import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CalendarPlus } from 'lucide-react';
import EventForm from '../../components/events/EventForm';
import { createEvent } from '../../api/eventApi';

const CreateEventPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    setError('');
    setLoading(true);

    try {
      const response = await createEvent(formData);
      if (response.success) {
        navigate('/organizer/my-events', { replace: true });
        return;
      }
      setError(response.message || 'Something went wrong while creating the event.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while creating the event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] text-[#F8F7F5]">
          <CalendarPlus size={20} strokeWidth={1.75} />
        </span>
        <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F]">
          Create Event
        </h1>
        <p className="text-sm text-[#6B7280]">
          Fill in the details below to publish a new event.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(31,31,31,0.08)] md:p-10"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
            {error}
          </motion.div>
        )}

        <EventForm
          onSubmit={handleCreate}
          loading={loading}
          submitLabel="Create Event"
        />
      </motion.div>
    </div>
  );
};

export default CreateEventPage;
