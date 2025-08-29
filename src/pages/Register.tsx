import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '../services/api';
import Input from '../components/forms/Input';
import Loader from '../components/common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Toasts, { Toast } from '../components/common/Toast';

type FormData = { email: string; password: string; confirmPassword: string };

export default function RegisterPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await api.post('/register', { email: data.email, password: data.password });
      setToasts(prev => [...prev, { id: Date.now(), message: t('toasts.registerSuccess'), type: 'success' }]);
      navigate('/login');
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
        <h1 className="mb-4 text-2xl font-semibold">{t('register.title')}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            placeholder="eve.holt@reqres.in"
            label={t('common.email')}
            {...register('email', { required: t('register.validation.emailRequired') || 'Required' })}
            error={errors.email?.message}
          />

          <Input
            type="password"
            placeholder="******"
            label={t('common.password')}
            {...register('password', {
              required: true,
              minLength: { value: 6, message: t('register.validation.passwordMinLength') || '6+' }
            })}
            error={errors.password?.message}
          />

          <Input
            type="password"
            placeholder="******"
            label={t('register.confirmPassword')}
            {...register('confirmPassword', {
              validate: (v) => v === watch('password') || (t('register.validation.passwordsNotMatch') as string)
            })}
            error={errors.confirmPassword?.message}
          />

          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
            {t('register.submitButton')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-emerald-600 hover:underline dark:text-emerald-400">
            {t('register.loginLink')}
          </Link>
        </div>

        {loading && <Loader />}
      </motion.div>
    </div>
  );
}
