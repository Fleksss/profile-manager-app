import { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...props }, ref) => {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>}
      <input
        ref={ref}
        {...props}
        className={`w-full rounded-xl border px-3 py-2 outline-none transition focus:ring-2 dark:bg-gray-800 dark:text-gray-100
          ${error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-emerald-300 dark:border-gray-700'}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
});

export default Input;
