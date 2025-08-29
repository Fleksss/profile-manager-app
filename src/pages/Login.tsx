import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/forms/Input';
import Loader from '../components/common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Toasts, { Toast } from '../components/common/Toast';
import { motion } from 'framer-motion';

type FormData = { email: string; password: string };

export default function LoginPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await api.post('/login', data);
      const token = res.data.token as string;
      // Fake user id for demo: ReqRes returns user with id=2 for example list.
      login(token, 2);
      setToasts(prev => [...prev, { id: Date.now(), message: t('toasts.loginSuccess'), type: 'success' }]);
      navigate('/profile');
    } catch (e) {
      setToasts(prev => [...prev, { id: Date.now(), message: t('common.error'), type: 'error' }]);
    } finally {
      setLoading(false);
    }
  };

  const closeToast = (id:number) => setToasts(t => t.filter(x => x.id !== id));

  return (
    <div className="mx-auto mt-10 max-w-md p-4">
      <Toasts toasts={toasts} onClose={closeToast} />
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h1 className="mb-4 text-2xl font-semibold">{t('login.title')}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            placeholder="eve.holt@reqres.in"
            label={t('common.email')}
            {...register('email', { required: true })}
            error={errors.email ? t('register.validation.emailRequired') || 'Required' : undefined}
          />

          <Input
            type="password"
            placeholder="cityslicka"
            label={t('common.password')}
            {...register('password', { required: true })}
            error={errors.password ? (t('register.validation.passwordMinLength') as string) : undefined}
          />

          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
            {t('login.submitButton')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/register" className="text-emerald-600 hover:underline dark:text-emerald-400">
            {t('login.registerLink')}
          </Link>
        </div>

        {loading && <Loader />}
      </motion.div>
    </div>
  );
}
