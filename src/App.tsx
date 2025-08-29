import { Routes, Route, Navigate, Link } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import Header from './components/layout/Header';
import { useEffect } from 'react';
import { storage } from './utils/storage';

export default function App() {
  useEffect(() => {
    const theme = storage.get<string>('theme');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}> 
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div className="mx-auto mt-16 max-w-2xl p-4 text-center">
      <h1 className="mb-4 text-3xl font-semibold">Profile Manager</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Minimal demo for registration, login, and protected profile page with localization and dark mode.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link to="/register" className="rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Register</Link>
        <Link to="/login" className="rounded-xl border border-emerald-600 px-4 py-2 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30">Login</Link>
      </div>
    </div>
  );
}
