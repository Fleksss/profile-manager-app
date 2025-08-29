export const storage = {
  get: <T>(key: string, fallback: T | null = null): T | null => {
    const raw = localStorage.getItem(key);
    try {
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key: string) => localStorage.removeItem(key),
};
