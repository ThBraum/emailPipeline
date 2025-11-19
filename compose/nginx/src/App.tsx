import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeProvider, styled } from 'styled-components'
import { EmailForm } from './components/EmailForm'
import { Snackbar, type SnackbarState } from './components/Snackbar'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { GlobalStyle } from './styles/global'
import { themes, type ThemeName } from './styles/themes'
import { sendEmail } from './services/emailService'
import type { EmailPayload } from './types/email'

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 4rem);
  place-items: center;
  position: relative;
`

const Toolbar = styled.div`
  position: absolute;
  top: clamp(1.2rem, 4vw, 2.4rem);
  right: clamp(1.2rem, 4vw, 2.4rem);
  display: flex;
  gap: 0.85rem;
  align-items: center;
`

const Spotlight = styled.div`
  position: absolute;
  inset: 12% 10% auto;
  height: clamp(240px, 42vw, 360px);
  background: radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.35), transparent 60%),
    radial-gradient(circle at 80% 40%, rgba(236, 72, 153, 0.22), transparent 62%);
  filter: blur(45px);
  opacity: 0.7;
  pointer-events: none;
  z-index: -1;
`

const initialSnackbar: SnackbarState = {
  open: false,
  message: '',
  variant: 'success'
}

function getStoredTheme(): ThemeName | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem('compose-theme') as ThemeName | null
  return stored ?? null
}

function getPreferredTheme(): ThemeName {
  if (typeof window === 'undefined') return 'light'
  const stored = getStoredTheme()
  if (stored) return stored
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function App() {
  const [themeName, setThemeName] = useState<ThemeName>(getPreferredTheme)
  const [snackbar, setSnackbar] = useState<SnackbarState>(initialSnackbar)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('compose-theme', themeName)
  }, [themeName])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const listener = (event: MediaQueryListEvent) => {
      const stored = getStoredTheme()
      if (!stored) {
        setThemeName(event.matches ? 'dark' : 'light')
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  const theme = useMemo(() => themes[themeName], [themeName])

  const handleThemeChange = useCallback((next: ThemeName) => {
    setThemeName(next)
  }, [])

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }, [])

  const handleSendEmail = useCallback(async (payload: EmailPayload) => {
    try {
      await sendEmail(payload)
      setSnackbar({
        open: true,
        message: 'Email enviado com sucesso!',
        variant: 'success'
      })
      return true
    } catch (error) {
      const fallback = 'Erro ao enviar o email. Tente novamente.'
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
        fallback

      setSnackbar({
        open: true,
        message,
        variant: 'error'
      })
      return false
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Page>
        <Spotlight aria-hidden />
        <Toolbar>
          <ThemeSwitcher value={themeName} onChange={handleThemeChange} />
        </Toolbar>
        <EmailForm onSendEmail={handleSendEmail} />
        <Snackbar {...snackbar} onClose={handleCloseSnackbar} />
      </Page>
    </ThemeProvider>
  )
}

export default App
