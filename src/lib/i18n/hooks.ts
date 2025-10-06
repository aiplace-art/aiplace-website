import { useI18nContext } from './context'

/**
 * Hook to access i18n translation function and language state
 *
 * @example
 * const { t, language, setLanguage } = useTranslation()
 *
 * return (
 *   <div>
 *     <h1>{t('hero.title')}</h1>
 *     <p>{t('hero.subtitle')}</p>
 *     <button onClick={() => setLanguage('ru')}>Switch to Russian</button>
 *   </div>
 * )
 */
export function useTranslation() {
  return useI18nContext()
}
