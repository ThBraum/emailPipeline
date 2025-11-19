import { useEffect } from 'react'
import { styled, keyframes } from 'styled-components'

export type SnackbarVariant = 'success' | 'error'

export type SnackbarState = {
  open: boolean
  message: string
  variant: SnackbarVariant
}

type SnackbarProps = SnackbarState & {
  onClose: () => void
  autoHideDuration?: number
}

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Container = styled.div<{ $variant: SnackbarVariant }>`
  position: fixed;
  bottom: clamp(1rem, 4vw, 2.3rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.95rem 1.5rem;
  border-radius: 999px;
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) =>
    props.$variant === 'success'
      ? props.theme.colors.success
      : props.theme.colors.error};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.md};
  animation: ${slideIn} 0.35s ease;
  backdrop-filter: blur(18px);
  z-index: 999;

  &::before {
    content: '';
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 999px;
    background: currentColor;
  }
`

const CloseButton = styled.button`
  appearance: none;
  border: none;
  margin: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.accent};
    outline-offset: 3px;
  }
`

export function Snackbar({ open, message, variant, onClose, autoHideDuration = 5200 }: SnackbarProps) {
  useEffect(() => {
    if (!open) return

    const timeout = window.setTimeout(onClose, autoHideDuration)
    return () => window.clearTimeout(timeout)
  }, [open, autoHideDuration, onClose])

  if (!open) return null

  return (
    <Container
      role="status"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-atomic
      $variant={variant}
    >
      {message}
      <CloseButton type="button" onClick={onClose} aria-label="Fechar notificação">
        ×
      </CloseButton>
    </Container>
  )
}
