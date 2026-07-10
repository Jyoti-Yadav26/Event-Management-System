const ErrorAlert = ({ message, fieldErrors }) => {
  if (!message && !fieldErrors) {
    return null;
  }

  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      {message && <p>{message}</p>}
      {fieldErrors && (
        <ul className="mt-2 list-inside list-disc space-y-1">
          {Object.entries(fieldErrors).map(([field, error]) => (
            <li key={field}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ErrorAlert;
