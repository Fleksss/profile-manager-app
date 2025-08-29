import { useEffect, useState } from 'react';

export type Toast = { id: number; message: string; type?: 'success' | 'error' };

export default function Toasts({ toasts, onClose }: { toasts: Toast[]; onClose: (id:number)=>void }) {
  const [list, setList] = useState(toasts);
  useEffect(() => setList(toasts), [toasts]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {list.map(t => (
        <div key={t.id} className={`card px-4 py-3 text-sm ${t.type === 'error' ? 'border border-red-300 dark:border-red-600' : 'border border-emerald-300 dark:border-emerald-700'}`}>
          <div className="flex items-center justify-between gap-4">
            <span className={t.type === 'error' ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}>{t.message}</span>
            <button aria-label="Close" className="text-xs opacity-60 hover:opacity-100" onClick={() => onClose(t.id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
