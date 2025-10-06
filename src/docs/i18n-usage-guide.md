# I18N Usage Guide - AiPlace Website

## Quick Start

The i18n system is already integrated into the application. All you need to do is use the `useTranslation` hook in your components.

## Basic Usage

### 1. Import the hook

```tsx
import { useTranslation } from '@/lib/i18n'
```

### 2. Use translations in your component

```tsx
export function MyComponent() {
  const { t, language, setLanguage } = useTranslation()

  return (
    <div>
      <h1>{t('hero.title.line1')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button onClick={() => setLanguage('ru')}>
        Switch to Russian
      </button>
    </div>
  )
}
```

## Available Properties

The `useTranslation` hook returns:

- `t(key: string)`: Translation function
- `language`: Current language ('en' | 'ru')
- `setLanguage(lang)`: Function to change language
- `translations`: Full translation object (rarely needed)

## Translation Keys

All translation keys follow a nested structure. Use dot notation to access nested values:

### Navigation
```tsx
t('nav.services')     // "Services" / "Услуги"
t('nav.portfolio')    // "Portfolio" / "Портфолио"
t('nav.contact')      // "Contact" / "Контакты"
```

### Hero Section
```tsx
t('hero.badge')                  // Badge text
t('hero.title.line1')            // Title line 1
t('hero.title.line2')            // Title line 2
t('hero.subtitle')               // Subtitle
t('hero.cta.getStarted')         // CTA button
t('hero.stats.projects.label')   // Stats label
```

### Services
```tsx
t('services.title')                         // Section title
t('services.items.aiDevelopment.title')     // Service title
t('services.items.aiDevelopment.description') // Service description
```

### Portfolio
```tsx
t('portfolio.title')                    // Section title
t('portfolio.categories.all')           // Category filter
t('portfolio.actions.quickView')        // Action button
```

### Contact Form
```tsx
t('contact.form.title')              // Form title
t('contact.form.fields.name')        // Field label
t('contact.form.buttons.submit')     // Submit button
```

### Footer
```tsx
t('footer.tagline')                  // Company tagline
t('footer.sections.services')        // Section title
t('footer.services.webDevelopment')  // Service link
```

## Example Components

### Example 1: Hero Section

```tsx
"use client"

import { useTranslation } from '@/lib/i18n'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <span className="badge">{t('hero.badge')}</span>
      <h1>
        {t('hero.title.line1')} <br />
        {t('hero.title.line2')}
      </h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta.getStarted')}</button>
    </section>
  )
}
```

### Example 2: Navigation with Language Toggle

```tsx
"use client"

import { useTranslation } from '@/lib/i18n'
import Link from 'next/link'

export function Navigation() {
  const { t, language, setLanguage } = useTranslation()

  const navItems = [
    { label: t('nav.services'), href: '/services' },
    { label: t('nav.portfolio'), href: '/portfolio' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ]

  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <button onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}>
        {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
      </button>
    </nav>
  )
}
```

### Example 3: Contact Form

```tsx
"use client"

import { useTranslation } from '@/lib/i18n'
import { useState } from 'react'

export function ContactForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  return (
    <form>
      <h2>{t('contact.form.title')}</h2>
      <p>{t('contact.form.subtitle')}</p>

      <div>
        <label>{t('contact.form.fields.name')}</label>
        <input
          placeholder={t('contact.form.placeholders.name')}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label>{t('contact.form.fields.email')}</label>
        <input
          type="email"
          placeholder={t('contact.form.placeholders.email')}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label>{t('contact.form.fields.message')}</label>
        <textarea
          placeholder={t('contact.form.placeholders.message')}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button type="submit">
        {t('contact.form.buttons.submit')}
      </button>
    </form>
  )
}
```

## Adding New Translations

### 1. Edit Translation Files

Add your new keys to both `/src/locales/en.json` and `/src/locales/ru.json`:

**en.json:**
```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "Section description"
  }
}
```

**ru.json:**
```json
{
  "newSection": {
    "title": "Название нового раздела",
    "description": "Описание раздела"
  }
}
```

### 2. Update TypeScript Types (Optional but Recommended)

Edit `/src/lib/i18n/types.ts` to add type safety:

```typescript
export interface TranslationKeys {
  // ... existing types
  newSection: {
    title: string
    description: string
  }
}
```

### 3. Use in Component

```tsx
const { t } = useTranslation()

<h2>{t('newSection.title')}</h2>
<p>{t('newSection.description')}</p>
```

## Best Practices

### 1. Always use the `t()` function
```tsx
// ✅ Good
<h1>{t('hero.title.line1')}</h1>

// ❌ Bad - hardcoded text
<h1>Where Creativity</h1>
```

### 2. Use semantic key names
```tsx
// ✅ Good
t('contact.form.buttons.submit')

// ❌ Bad - unclear
t('btn1')
```

### 3. Keep translations organized
Group related translations under the same parent key:
```json
{
  "contact": {
    "form": { ... },
    "info": { ... },
    "social": { ... }
  }
}
```

### 4. Handle missing translations
The system automatically falls back to English if a translation is missing. Still, always provide both EN and RU translations.

### 5. Use placeholders when needed
For dynamic content, you can build strings:
```tsx
const count = 5
const text = `${count} ${t('common.items')}`
```

## Language Switcher

The `LanguageSwitcher` component is already integrated into the header. You can also use it anywhere:

```tsx
import { LanguageSwitcher } from '@/components/layout/language-switcher'

export function MyComponent() {
  return (
    <div>
      <LanguageSwitcher />
    </div>
  )
}
```

## Checking Current Language

```tsx
const { language } = useTranslation()

if (language === 'en') {
  // English-specific logic
} else {
  // Russian-specific logic
}
```

## Programmatic Language Change

```tsx
const { setLanguage } = useTranslation()

// Switch to Russian
setLanguage('ru')

// Switch to English
setLanguage('en')

// Toggle
setLanguage(language === 'en' ? 'ru' : 'en')
```

## Persistence

Language preference is automatically saved to `localStorage` with key `aiplace-language` and persists across sessions.

## Server-Side Rendering (SSR)

The i18n provider is client-side only (`"use client"`) to avoid hydration issues with localStorage. This is intentional and works perfectly for our use case.

## Troubleshooting

### Translation not showing

1. Check the key exists in both `en.json` and `ru.json`
2. Verify you're using correct dot notation: `t('section.subsection.key')`
3. Check browser console for warnings about missing keys

### Language not persisting

1. Check browser localStorage: `localStorage.getItem('aiplace-language')`
2. Clear browser cache and try again
3. Make sure you're using `setLanguage()` to change language

### TypeScript errors

1. Make sure types are updated in `/src/lib/i18n/types.ts`
2. Restart TypeScript server in your editor
3. Check import paths are correct

## Complete Translation Keys Reference

See the full structure in:
- `/src/locales/en.json` - English translations
- `/src/locales/ru.json` - Russian translations
- `/src/lib/i18n/types.ts` - TypeScript types

## Testing

To test language switching:

1. Open the website
2. Click the language switcher in the header (🇬🇧 EN / 🇷🇺 RU)
3. Verify all text changes to the selected language
4. Refresh the page - language should persist
5. Check different pages to ensure consistency

## Performance

- Translation files are imported statically (no lazy loading needed)
- Total bundle size increase: ~10KB
- No runtime overhead for translation lookup
- Language switching is instant (no page reload)

## Future Enhancements

Potential additions (not currently implemented):

1. More languages (Spanish, French, etc.)
2. ICU MessageFormat for pluralization
3. Date/number localization with Intl API
4. Translation management service integration
5. SEO improvements with hreflang tags

## Support

For questions or issues, refer to:
- Architecture documentation: `/src/docs/i18n-architecture.md`
- Source code: `/src/lib/i18n/`
- Translation files: `/src/locales/`
