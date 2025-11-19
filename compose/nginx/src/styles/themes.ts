export type ThemeName = 'light' | 'dark'

export interface AppTheme {
  name: ThemeName
  colors: {
    background: string
    surface: string
    surfaceSoft: string
    text: string
    textMuted: string
    accent: string
    accentSoft: string
    border: string
    success: string
    error: string
    inputBackground: string
  }
  shadows: {
    sm: string
    md: string
    glow: string
  }
}

export const lightTheme: AppTheme = {
  name: 'light',
  colors: {
    background: '#f5f7ff',
    surface: 'rgba(255, 255, 255, 0.85)',
    surfaceSoft: 'rgba(255, 255, 255, 0.6)',
    text: '#151928',
    textMuted: '#4b5167',
    accent: '#4c6ef5',
    accentSoft: 'rgba(76, 110, 245, 0.16)',
    border: 'rgba(21, 25, 40, 0.12)',
    success: '#2f9e44',
    error: '#e03131',
    inputBackground: 'rgba(255, 255, 255, 0.9)'
  },
  shadows: {
    sm: '0 8px 24px rgba(32, 40, 70, 0.08)',
    md: '0 18px 48px rgba(32, 40, 70, 0.12)',
    glow: '0 0 70px rgba(76, 110, 245, 0.25)'
  }
}

export const darkTheme: AppTheme = {
  name: 'dark',
  colors: {
    background: '#0f172a',
    surface: 'rgba(15, 23, 42, 0.75)',
    surfaceSoft: 'rgba(30, 41, 72, 0.55)',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    accent: '#60a5fa',
    accentSoft: 'rgba(96, 165, 250, 0.18)',
    border: 'rgba(148, 163, 184, 0.18)',
    success: '#4ade80',
    error: '#f87171',
    inputBackground: 'rgba(15, 23, 42, 0.9)'
  },
  shadows: {
    sm: '0 10px 30px rgba(15, 23, 42, 0.45)',
    md: '0 26px 60px rgba(12, 18, 34, 0.55)',
    glow: '0 0 110px rgba(96, 165, 250, 0.4)'
  }
}

export const themes: Record<ThemeName, AppTheme> = {
  light: lightTheme,
  dark: darkTheme
}
