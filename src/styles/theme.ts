/**
 * AiPlace Theme Configuration
 * Handles theme switching and persistence
 */

export type Theme = 'light' | 'dark' | 'system';

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'system';
  private mediaQuery: MediaQueryList | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.initialize();
    }
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private initialize(): void {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }

    // Apply initial theme
    this.applyTheme();

    // Listen for system theme changes
    this.mediaQuery?.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });
  }

  private applyTheme(): void {
    const html = document.documentElement;
    const effectiveTheme = this.getEffectiveTheme();

    if (effectiveTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(effectiveTheme);
  }

  private getEffectiveTheme(): 'light' | 'dark' {
    if (this.currentTheme === 'system') {
      return this.mediaQuery?.matches ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  private updateMetaThemeColor(theme: 'light' | 'dark'): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#0A0A0A' : '#FFFFFF'
      );
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();

    // Dispatch custom event for theme change
    window.dispatchEvent(
      new CustomEvent('themechange', { detail: { theme: this.getEffectiveTheme() } })
    );
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  getEffectiveThemeValue(): 'light' | 'dark' {
    return this.getEffectiveTheme();
  }

  toggleTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    this.setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
  }
}

// Export singleton instance
export const themeManager = typeof window !== 'undefined'
  ? ThemeManager.getInstance()
  : null;

// React hook for theme management
export function useTheme() {
  const manager = ThemeManager.getInstance();

  return {
    theme: manager.getTheme(),
    effectiveTheme: manager.getEffectiveThemeValue(),
    setTheme: (theme: Theme) => manager.setTheme(theme),
    toggleTheme: () => manager.toggleTheme(),
  };
}
