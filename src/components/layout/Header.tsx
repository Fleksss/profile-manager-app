import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { storage } from '../../utils/storage';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const current = i18n.language || 'en';

  const changeLang = (lng: 'en' | 'ru') => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    storage.set('theme', isDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md dark:bg-gray-900/70">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <Link to="/" className="font-semibold text-emerald-600 dark:text-emerald-400">Profile Manager</Link>

        <nav className="flex items-center gap-4">
          <NavLink to="/profile" className={({isActive}) => isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-300'}>
            {t('common.profile')}
          </NavLink>

          <div className="flex items-center gap-2">
            <button onClick={() => changeLang('en')} className={`px-2 py-1 text-xs rounded ${current==='en' ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-gray-100 dark:bg-gray-800'}`}>EN</button>
            <button onClick={() => changeLang('ru')} className={`px-2 py-1 text-xs rounded ${current==='ru' ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-gray-100 dark:bg-gray-800'}`}>RU</button>
          </div>

          <button onClick={toggleTheme} className="rounded-xl bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">
            {t('common.theme')}
          </button>

          {auth.token ? (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { logout(); navigate('/login'); }}
              className="rounded-xl bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-700">
              {t('common.logout')}
            </motion.button>
          ) : (
            <NavLink to="/login" className="text-sm text-emerald-600 dark:text-emerald-400">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
