import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-24 text-[#6B7280] ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 size={24} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
