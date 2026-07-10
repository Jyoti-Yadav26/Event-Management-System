import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message, fieldErrors, className = '' }) => {
  if (!message && !fieldErrors) {
    return null;
  }

  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 ${className}`}
      role="alert"
    >
      {message && (
        <div className="flex items-center gap-2">
          <AlertCircle size={16} strokeWidth={1.75} className="shrink-0" />
          <span>{message}</span>
        </div>
      )}
      {fieldErrors && (
        <ul className="ml-6 list-disc space-y-1">
          {Object.entries(fieldErrors).map(([field, error]) => (
            <li key={field}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ErrorAlert;
