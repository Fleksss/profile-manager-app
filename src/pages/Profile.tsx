import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Loader from '../components/common/Loader';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import type { User } from '../types';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = auth.userId || 2; // fallback for demo
    api.get(`/users/${id}`).then(res => setUser(res.data.data)).finally(() => setLoading(false));
  }, [auth.userId]);

  if (loading) return <Loader />;

  if (!user) return <div className="p-4 text-red-500">{t('common.error')}</div>;

  return (
    <div className="mx-auto mt-10 max-w-lg p-4">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h1 className="mb-6 text-2xl font-semibold">{t('profile.title')}</h1>
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="avatar" className="h-24 w-24 rounded-full ring-2 ring-emerald-300" />
          <div>
            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-gray-600 dark:text-gray-300">{user.email}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
