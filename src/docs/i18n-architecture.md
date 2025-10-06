# I18N Architecture - AiPlace Website

## Overview
Simple, client-side internationalization system for English and Russian languages without complex routing or server-side rendering.

## Architecture Decision Records

### ADR-001: Technology Choice
**Decision**: Custom lightweight i18n solution instead of next-intl
**Rationale**:
- Next-intl requires app router restructuring and complex routing setup
- Custom solution provides full control and simplicity
- Client-side only approach is sufficient for this use case
- Reduces bundle size and dependencies
- Easier to maintain and extend

**Trade-offs**:
- Pros: Lightweight, simple, flexible, no routing changes needed
- Cons: No SEO benefits from language-specific URLs (not required for this project)

### ADR-002: Language Storage Strategy
**Decision**: Use localStorage for language persistence
**Rationale**:
- Persists user preference across sessions
- No server-side storage needed
- Simple implementation
- Instant language switching

**Trade-offs**:
- Pros: Fast, simple, no backend required
- Cons: Not available in SSR context (acceptable for client-side approach)

### ADR-003: Translation File Format
**Decision**: JSON files for translations
**Rationale**:
- Easy to read and edit
- Native JavaScript support
- Can be easily validated
- Industry standard

**Structure**:
```json
{
  "nav": { "home": "...", "services": "..." },
  "hero": { "title": "...", "subtitle": "..." },
  "services": { ... },
  "portfolio": { ... },
  "contact": { ... }
}
```

## System Architecture

### Component Diagram (C4 Model - Level 2)

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              RootLayout (layout.tsx)                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │        I18nProvider (context.tsx)               │  │  │
│  │  │  - Manages language state                       │  │  │
│  │  │  - Provides translation function                │  │  │
│  │  │  - Handles localStorage sync                    │  │  │
│  │  │                                                  │  │  │
│  │  │  ┌────────────────────────────────────────┐    │  │  │
│  │  │  │      React Context Provider            │    │  │  │
│  │  │  │  - currentLanguage: 'en' | 'ru'        │    │  │  │
│  │  │  │  - setLanguage: (lang) => void         │    │  │  │
│  │  │  │  - t: (key) => string                  │    │  │  │
│  │  │  └────────────────────────────────────────┘    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Components Layer                          │  │
│  │                                                         │  │
│  │  ┌──────────────────┐  ┌──────────────────┐          │  │
│  │  │ LanguageSwitcher │  │  Page Components │          │  │
│  │  │  - Toggle EN/RU  │  │  - Use useTranslation() │  │  │
│  │  │  - Update context│  │  - Call t('key')        │  │  │
│  │  └──────────────────┘  └──────────────────┘          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Translation Files (Static)                      │
│  /src/locales/en.json    /src/locales/ru.json              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Browser Storage                                 │
│  localStorage['aiplace-language'] = 'en' | 'ru'            │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
User Action               State Update              UI Update
──────────────────────────────────────────────────────────────

User clicks          →  setLanguage('ru')    →  Context updates
language toggle

                     →  Save to localStorage →  Re-render with
                                                 new translations

                     →  Load translations   →  UI displays
                        from ru.json            Russian text
```

### File Structure

```
/Users/ai.place/WEbsite/
├── src/
│   ├── lib/
│   │   └── i18n/
│   │       ├── context.tsx          # I18nProvider & Context
│   │       ├── hooks.ts             # useTranslation hook
│   │       └── types.ts             # TypeScript types
│   │
│   ├── locales/
│   │   ├── en.json                  # English translations
│   │   └── ru.json                  # Russian translations
│   │
│   ├── components/
│   │   └── layout/
│   │       └── language-switcher.tsx # Language toggle UI
│   │
│   └── app/
│       └── layout.tsx               # Wrap with I18nProvider
```

## Component Specifications

### 1. I18nContext & Provider (`src/lib/i18n/context.tsx`)

**Responsibilities**:
- Create React Context for i18n state
- Provide language state management
- Load translation files dynamically
- Sync with localStorage
- Provide translation function

**API**:
```typescript
interface I18nContextType {
  language: 'en' | 'ru'
  setLanguage: (lang: 'en' | 'ru') => void
  t: (key: string) => string
}
```

### 2. useTranslation Hook (`src/lib/i18n/hooks.ts`)

**Responsibilities**:
- Simple hook to access i18n context
- Provide convenient access to translation function

**API**:
```typescript
const { t, language, setLanguage } = useTranslation()
```

### 3. LanguageSwitcher Component (`src/components/layout/language-switcher.tsx`)

**Responsibilities**:
- Display language toggle button
- Show current language
- Handle language switching
- Accessible and responsive UI

**Features**:
- Flag emojis: 🇬🇧 EN / 🇷🇺 RU
- Smooth transition animations
- Mobile-friendly
- Keyboard accessible

### 4. Translation Files (`src/locales/*.json`)

**Structure**:
```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "title": "Digital Innovation & AI Solutions",
    "subtitle": "Transform your business with cutting-edge technology"
  },
  "services": {
    "title": "Our Services",
    "subtitle": "Comprehensive solutions for your digital needs"
  },
  "common": {
    "learnMore": "Learn More",
    "getStarted": "Get Started",
    "contactUs": "Contact Us"
  }
}
```

## Implementation Strategy

### Phase 1: Core Infrastructure
1. Create translation JSON files (en.json, ru.json)
2. Implement I18nContext and Provider
3. Create useTranslation hook
4. Add TypeScript types

### Phase 2: UI Components
5. Build LanguageSwitcher component
6. Integrate into Header component
7. Add to navigation

### Phase 3: Integration
8. Wrap RootLayout with I18nProvider
9. Update existing components to use translations
10. Test language switching

### Phase 4: Polish
11. Add loading states
12. Handle edge cases
13. Optimize performance
14. Document usage

## Quality Attributes

### Performance
- Minimal bundle size impact (~10KB for translations)
- Lazy loading of translation files
- No re-renders of unaffected components
- Instant language switching

### Maintainability
- Clear separation of concerns
- Type-safe with TypeScript
- Easy to add new languages
- Simple to update translations

### Scalability
- Easy to add new translation keys
- Can support more languages without refactoring
- Modular architecture

### Security
- No XSS vulnerabilities (translations are static)
- Safe localStorage usage
- Input validation on language selection

## Future Extensibility

### Potential Enhancements
1. **More Languages**: Add fr.json, de.json, etc.
2. **Translation Management**: Integrate with services like Phrase or Lokalise
3. **RTL Support**: Add right-to-left language support
4. **Pluralization**: Add ICU MessageFormat support
5. **Date/Number Formatting**: Use Intl API for locale-specific formatting
6. **SEO**: Add hreflang tags and language-specific meta tags

### Migration Path to Advanced i18n
If needed, can migrate to next-intl later:
- Translation files are compatible
- Component structure supports migration
- Can keep custom hook interface

## Testing Strategy

### Unit Tests
- Test translation function with different keys
- Test language switching
- Test localStorage sync
- Test missing translation fallbacks

### Integration Tests
- Test LanguageSwitcher interaction
- Test context provider
- Test hook usage in components

### E2E Tests
- Test full language switching flow
- Test persistence across page reloads
- Test all translated UI elements

## Monitoring & Operations

### Metrics to Track
- Language preference distribution (EN vs RU)
- Language switch frequency
- Missing translation keys (console warnings)

### Deployment Considerations
- Translation files are static assets
- No server-side rendering needed
- Can use CDN for translation files
- No database required

## Risk Mitigation

### Risk 1: Missing Translations
**Mitigation**: Fallback to English, log warning in dev mode

### Risk 2: localStorage Unavailable
**Mitigation**: Fall back to default language (EN), use in-memory state

### Risk 3: Large Translation Files
**Mitigation**: Code-split by page/section if needed, lazy load

### Risk 4: Translation Key Typos
**Mitigation**: TypeScript types for translation keys, ESLint rules

## Success Criteria

1. Users can switch between EN and RU seamlessly
2. Language preference persists across sessions
3. All UI text is translatable
4. No performance degradation
5. Mobile-friendly language switcher
6. Accessible to screen readers
7. Easy for developers to add translations

## Timeline Estimate

- Phase 1 (Core Infrastructure): 2 hours
- Phase 2 (UI Components): 1 hour
- Phase 3 (Integration): 2 hours
- Phase 4 (Polish & Testing): 1 hour

**Total**: 6 hours

## Conclusion

This architecture provides a simple, maintainable, and performant i18n solution for the AiPlace website. It meets all requirements while maintaining flexibility for future enhancements.
