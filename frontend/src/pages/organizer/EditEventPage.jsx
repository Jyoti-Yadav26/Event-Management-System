import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, PencilLine } from 'lucide-react';
import EventForm from '../../components/events/EventForm';
import { getEventById, updateEvent } from '../../api/eventApi';

const toFormTime = (time) => {
  if (!time) return '';
  return time.length >= 5 ? time.slice(0, 5) : time;
};

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getEventById(id);
        if (response.success) {
          const event = response.data;
          setInitialValues({
            title: event.title,
            description: event.description,
            category: event.category,
            date: event.date,
            time: toFormTime(event.time),
            location: event.location,
            maxSeats: String(event.maxSeats),
          });
        } else {
          setError(response.message || 'Failed to load event.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (formData) => {
    setError('');
    setSubmitting(true);

    try {
      const response = await updateEvent(id, formData);
      if (response.success) {
        navigate('/organizer/my-events', { replace: true });
        return;
      }
      setError(response.message || 'Something went wrong while updating the event.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong while updating the event.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-[#6B7280]">
        <Loader2 size={24} strokeWidth={1.75} className="animate-spin" />
        <span className="text-sm">Loading event...</span>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} strokeWidth={1.75} />
          {error || 'Event not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] text-[#F8F7F5]">
          <PencilLine size={20} strokeWidth={1.75} />
        </span>
        <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#1F1F1F]">
          Edit Event
        </h1>
        <p className="text-sm text-[#6B7280]">
          Update the details for your event.
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
          initialValues={initialValues}
          onSubmit={handleUpdate}
          loading={submitting}
          submitLabel="Update Event"
        />
      </motion.div>
    </div>
  );
};

export default EditEventPage;
