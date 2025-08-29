import { useTranslation } from 'react-i18next';

export default function Loader() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent dark:border-gray-600"></div>
      <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">{t('common.loading')}</span>
    </div>
  );
}
