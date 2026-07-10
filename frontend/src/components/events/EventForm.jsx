import { useState, useEffect } from 'react';
import {
  Type,
  AlignLeft,
  Tag,
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { EVENT_CATEGORIES } from '../../utils/constants';

const DEFAULT_VALUES = {
  title: '',
  description: '',
  category: 'TECH',
  date: '',
  time: '',
  location: '',
  maxSeats: '',
};

const EventForm = ({
  initialValues,
  onSubmit,
  loading,
  submitLabel = 'Save Event',
}) => {
  const [formData, setFormData] = useState({
    ...DEFAULT_VALUES,
    ...initialValues,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.location.trim()) errors.location = 'Location is required';

    if (!formData.maxSeats) {
      errors.maxSeats = 'Maximum seats is required';
    } else if (Number(formData.maxSeats) <= 0) {
      errors.maxSeats = 'Maximum seats must be greater than 0';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const time =
      formData.time.length === 5 ? `${formData.time}:00` : formData.time;

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date,
      time,
      location: formData.location.trim(),
      maxSeats: Number(formData.maxSeats),
    });
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-[#F8F7F5] py-3.5 pl-11 pr-4 text-sm text-[#1F1F1F] placeholder:text-[#6B7280] transition-colors duration-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F1F1F]/10 ${
      fieldErrors[field]
        ? 'border-red-300'
        : 'border-transparent focus:border-[#1F1F1F]/20'
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Title
        </label>
        <div className="relative">
          <Type
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange('title')}
            placeholder="Event title"
            className={inputClass('title')}
          />
        </div>
        {fieldErrors.title && (
          <span className="text-xs text-red-500">{fieldErrors.title}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Description
        </label>
        <div className="relative">
          <AlignLeft
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-4 text-[#6B7280]"
          />
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange('description')}
            placeholder="Tell attendees what this event is about"
            rows={4}
            className={`resize-none ${inputClass('description')}`}
          />
        </div>
        {fieldErrors.description && (
          <span className="text-xs text-red-500">{fieldErrors.description}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Category
        </label>
        <div className="relative">
          <Tag
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <select
            id="category"
            value={formData.category}
            onChange={handleChange('category')}
            className={`appearance-none pr-10 ${inputClass('category')}`}
          >
            {EVENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.75}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
        </div>
        {fieldErrors.category && (
          <span className="text-xs text-red-500">{fieldErrors.category}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
            Date
          </label>
          <div className="relative">
            <Calendar
              size={18}
              strokeWidth={1.75}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange('date')}
              className={inputClass('date')}
            />
          </div>
          {fieldErrors.date && (
            <span className="text-xs text-red-500">{fieldErrors.date}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="time" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
            Time
          </label>
          <div className="relative">
            <Clock
              size={18}
              strokeWidth={1.75}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              id="time"
              type="time"
              value={formData.time}
              onChange={handleChange('time')}
              className={inputClass('time')}
            />
          </div>
          {fieldErrors.time && (
            <span className="text-xs text-red-500">{fieldErrors.time}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="location" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Location
        </label>
        <div className="relative">
          <MapPin
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange('location')}
            placeholder="Venue or address"
            className={inputClass('location')}
          />
        </div>
        {fieldErrors.location && (
          <span className="text-xs text-red-500">{fieldErrors.location}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="maxSeats" className="text-xs font-medium uppercase tracking-wider text-[#6B7280]">
          Maximum Seats
        </label>
        <div className="relative">
          <Users
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
          <input
            id="maxSeats"
            type="number"
            min="1"
            value={formData.maxSeats}
            onChange={handleChange('maxSeats')}
            placeholder="e.g. 100"
            className={inputClass('maxSeats')}
          />
        </div>
        {fieldErrors.maxSeats && (
          <span className="text-xs text-red-500">{fieldErrors.maxSeats}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-4 text-sm font-medium text-[#F8F7F5] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            Saving...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default EventForm;
