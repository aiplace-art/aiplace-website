# I18N System Architecture Diagram

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Browser Application                          │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                    App Root (layout.tsx)                        │ │
│  │                                                                  │ │
│  │  ┌────────────────────────────────────────────────────────────┐│ │
│  │  │              Providers Component                            ││ │
│  │  │                                                              ││ │
│  │  │  ┌──────────────────────────────────────────────────────┐  ││ │
│  │  │  │        I18nProvider (context.tsx)                    │  ││ │
│  │  │  │  ┌────────────────────────────────────────────────┐  │  ││ │
│  │  │  │  │  React.Context                                 │  │  ││ │
│  │  │  │  │  - language: 'en' | 'ru'                       │  │  ││ │
│  │  │  │  │  - setLanguage(lang)                           │  │  ││ │
│  │  │  │  │  - t(key): string                              │  │  ││ │
│  │  │  │  │  - translations: TranslationKeys               │  │  ││ │
│  │  │  │  └────────────────────────────────────────────────┘  │  ││ │
│  │  │  │           ▲                                           │  ││ │
│  │  │  │           │ Provides context to all children         │  ││ │
│  │  │  └───────────┼───────────────────────────────────────────┘  ││ │
│  │  │              │                                               ││ │
│  │  │              │                                               ││ │
│  │  └──────────────┼───────────────────────────────────────────────┘│ │
│  │                 │                                                 │ │
│  │                 │ useTranslation() hook                           │ │
│  │                 │                                                 │ │
│  │  ┌──────────────▼─────────────────┬──────────────────────────┐  │ │
│  │  │                                 │                          │  │ │
│  │  │  ┌─────────────────────────┐   │  ┌─────────────────────┐│  │ │
│  │  │  │   Header Component       │   │  │  Page Components    ││  │ │
│  │  │  │                          │   │  │                     ││  │ │
│  │  │  │  - LanguageSwitcher      │   │  │  - Hero             ││  │ │
│  │  │  │    🇬🇧 EN / 🇷🇺 RU      │   │  │  - Services         ││  │ │
│  │  │  │                          │   │  │  - Portfolio        ││  │ │
│  │  │  │  - Navigation links      │   │  │  - Contact Form     ││  │ │
│  │  │  │    use t('nav.xxx')     │   │  │  - Footer           ││  │ │
│  │  │  │                          │   │  │                     ││  │ │
│  │  │  │  - Get Started button    │   │  │  All use:           ││  │ │
│  │  │  │    use t('nav.getStarted')│  │  │  const { t } =      ││  │ │
│  │  │  │                          │   │  │    useTranslation() ││  │ │
│  │  │  └─────────────────────────┘   │  └─────────────────────┘│  │ │
│  │  │                                 │                          │  │ │
│  │  └─────────────────────────────────┴──────────────────────────┘  │ │
│  │                                                                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                       Translation Data Layer                          │
│                                                                       │
│  ┌───────────────────────┐         ┌───────────────────────┐        │
│  │   /locales/en.json    │         │   /locales/ru.json    │        │
│  │                       │         │                       │        │
│  │  {                    │         │  {                    │        │
│  │    "nav": {...},      │         │    "nav": {...},      │        │
│  │    "hero": {...},     │         │    "hero": {...},     │        │
│  │    "services": {...}, │         │    "services": {...}, │        │
│  │    "portfolio": {...},│         │    "portfolio": {...},│        │
│  │    "contact": {...},  │         │    "contact": {...},  │        │
│  │    "footer": {...}    │         │    "footer": {...}    │        │
│  │  }                    │         │  }                    │        │
│  │                       │         │                       │        │
│  │  290 lines            │         │  290 lines            │        │
│  │  English              │         │  Russian              │        │
│  └───────────────────────┘         └───────────────────────┘        │
│              ▲                              ▲                         │
│              │                              │                         │
│              └──────────────┬───────────────┘                         │
│                             │                                         │
│                    Imported at build time                             │
│                             │                                         │
│                             ▼                                         │
│              ┌──────────────────────────────┐                        │
│              │  I18nProvider loads both     │                        │
│              │  translations into memory    │                        │
│              │  at component mount          │                        │
│              └──────────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      Browser Storage Layer                            │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    localStorage                                │   │
│  │                                                                │   │
│  │  Key: "aiplace-language"                                       │   │
│  │  Value: "en" | "ru"                                            │   │
│  │                                                                │   │
│  │  ┌──────────────────┐          ┌──────────────────┐          │   │
│  │  │  On page load    │          │  On language     │          │   │
│  │  │  ────────────    │          │  change          │          │   │
│  │  │  Read value      │          │  ────────────    │          │   │
│  │  │  Set as initial  │          │  Write new value │          │   │
│  │  │  language        │          │  Persist choice  │          │   │
│  │  └──────────────────┘          └──────────────────┘          │   │
│  │                                                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Action Flow:
──────────────────────────────────────────────────────────────────────

1. USER CLICKS LANGUAGE SWITCHER
   │
   ▼
2. setLanguage('ru') called
   │
   ├─► Update React state: language = 'ru'
   │
   ├─► Save to localStorage: localStorage.setItem('aiplace-language', 'ru')
   │
   └─► Trigger re-render
       │
       ▼
3. ALL COMPONENTS RE-RENDER
   │
   ├─► t('nav.services') → "Услуги"
   ├─► t('hero.title.line1') → "Где креативность"
   ├─► t('services.title') → "Наши услуги"
   └─► ... (all translations update instantly)
       │
       ▼
4. USER SEES RUSSIAN INTERFACE
   ✅ No page reload
   ✅ Instant switch
   ✅ Preference saved


Page Load Flow:
──────────────────────────────────────────────────────────────────────

1. USER OPENS WEBSITE
   │
   ▼
2. I18nProvider MOUNTS
   │
   ├─► Check localStorage for 'aiplace-language'
   │   │
   │   ├─► If exists: Use saved language
   │   └─► If not exists: Use default ('en')
   │
   ├─► Import translation files (en.json, ru.json)
   │
   └─► Create context with language and translations
       │
       ▼
3. COMPONENTS RENDER
   │
   └─► All components use t() function with correct language
       │
       ▼
4. USER SEES INTERFACE IN SAVED LANGUAGE
   ✅ Preference persisted
   ✅ Consistent experience


Translation Lookup Flow:
──────────────────────────────────────────────────────────────────────

1. COMPONENT CALLS t('hero.title.line1')
   │
   ▼
2. t() FUNCTION PROCESSES
   │
   ├─► Split key by dots: ['hero', 'title', 'line1']
   │
   ├─► Navigate through translation object:
   │   translations[language]['hero']['title']['line1']
   │
   ├─► If found: Return translated string
   │
   └─► If not found:
       │
       ├─► Log warning to console
       │
       ├─► Try English fallback
       │
       └─► If still not found: Return original key
           │
           ▼
3. TRANSLATED STRING RETURNED
   │
   └─► Component renders with correct translation
```

## Component Hierarchy

```
App Root
│
└─── Providers
     │
     └─── I18nProvider (State Management)
          │
          ├─── Header
          │    ├─── Logo
          │    ├─── Navigation
          │    │    └─── Links (use t('nav.xxx'))
          │    ├─── LanguageSwitcher
          │    │    └─── Toggle Button (🇬🇧 EN / 🇷🇺 RU)
          │    └─── CTA Button (use t('nav.getStarted'))
          │
          ├─── Main Content
          │    ├─── Hero (use t('hero.xxx'))
          │    ├─── Services (use t('services.xxx'))
          │    ├─── Portfolio (use t('portfolio.xxx'))
          │    ├─── Contact Form (use t('contact.form.xxx'))
          │    └─── CTA Section
          │
          └─── Footer (use t('footer.xxx'))
               ├─── Company Info
               ├─── Navigation Links
               ├─── Newsletter Form
               └─── Copyright
```

## API Flow

```
Public API: /src/lib/i18n/index.ts
│
├─── export { I18nProvider }
│    └─── Wrap app to provide i18n context
│
├─── export { useTranslation }
│    └─── Hook to access translation function
│
└─── export { Language, I18nContextType }
     └─── TypeScript types for type safety


Hook API: useTranslation()
│
Returns:
├─── language: 'en' | 'ru'
│    └─── Current active language
│
├─── setLanguage: (lang: Language) => void
│    └─── Function to change language
│
├─── t: (key: string) => string
│    └─── Translation function (main API)
│
└─── translations: TranslationKeys
     └─── Full translation object (rarely used)
```

## File Dependencies

```
Components that use i18n:
│
├─── /src/components/layout/header.tsx
│    └─── Imports: useTranslation, LanguageSwitcher
│
├─── /src/components/layout/language-switcher.tsx
│    └─── Imports: useTranslation
│
├─── /src/components/providers.tsx
│    └─── Imports: I18nProvider
│
└─── [Future: All page components]
     └─── Import: useTranslation


I18n Core Files:
│
├─── /src/lib/i18n/context.tsx
│    └─── Imports: en.json, ru.json, types.ts
│
├─── /src/lib/i18n/hooks.ts
│    └─── Imports: context.tsx
│
├─── /src/lib/i18n/types.ts
│    └─── No dependencies (pure types)
│
└─── /src/lib/i18n/index.ts
     └─── Exports: context.tsx, hooks.ts, types.ts


Translation Files:
│
├─── /src/locales/en.json
│    └─── Pure data (no dependencies)
│
└─── /src/locales/ru.json
     └─── Pure data (no dependencies)
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│              React Context State Management                  │
│                                                               │
│  Initial State (on mount):                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. Check localStorage('aiplace-language')              │ │
│  │ 2. If exists: use stored language                      │ │
│  │ 3. If not exists: default to 'en'                      │ │
│  │ 4. Load both translation files (en.json, ru.json)      │ │
│  │ 5. Create context value                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  State Updates (on language change):                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. User clicks language switcher                       │ │
│  │ 2. setLanguage('ru') called                            │ │
│  │ 3. Update state: setLanguageState('ru')                │ │
│  │ 4. Save to localStorage                                │ │
│  │ 5. Context re-renders all consumers                    │ │
│  │ 6. All t() calls now return Russian translations       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Context Value:                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ {                                                       │ │
│  │   language: 'en' | 'ru',        // Current language    │ │
│  │   setLanguage: (lang) => void,  // Updater function    │ │
│  │   t: (key) => string,           // Translation fn      │ │
│  │   translations: {...}           // Full object         │ │
│  │ }                                                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Performance Characteristics

```
Bundle Size Impact:
├─── Translation files: ~10KB (gzipped)
├─── I18n context code: ~2KB (gzipped)
├─── LanguageSwitcher: ~1KB (gzipped)
└─── Total: ~13KB (negligible)

Runtime Performance:
├─── Translation lookup: O(1) object access
├─── Language switch: <100ms (no network requests)
├─── Initial load: No additional overhead
└─── Re-renders: Only i18n consumers (efficient)

Memory Usage:
├─── Both translation files loaded: ~50KB RAM
├─── Context state: <1KB RAM
└─── Total: Negligible impact
```

This diagram provides a complete visual understanding of how the i18n system works, from component interaction to data flow and state management.
