import { styled } from 'styled-components'
import type { ThemeName } from '../styles/themes'

type ThemeSwitcherProps = {
  value: ThemeName
  onChange: (theme: ThemeName) => void
}

const SwitcherButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.surfaceSoft};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease;
  backdrop-filter: blur(18px);
  position: relative;
  z-index: 9999;
  overflow: hidden;
  min-width: 8.75rem;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${(props) => props.theme.colors.accentSoft};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.sm};

    &:before {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.accent};
    outline-offset: 3px;
  }

  span {
    position: relative;
    z-index: 2;
  }
`

const ThemeIcon = styled.span<{ $active: boolean }>`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${(props) =>
    props.$active
      ? props.theme.colors.accent
      : 'transparent'};
  color: ${(props) => (props.$active ? '#fff' : props.theme.colors.textMuted)};
  box-shadow: ${(props) => (props.$active ? props.theme.shadows.glow : 'none')};
  transition: all 0.35s ease;
`

const ModeLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textMuted};
`

export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  const toggle = () => {
    onChange(value === 'light' ? 'dark' : 'light')
  }

  const label = value === 'light' ? 'Claro' : 'Escuro'

  return (
    <SwitcherButton
      type="button"
      style={{ zIndex: 2 }}
      aria-label={`Alternar para o modo ${value === 'light' ? 'escuro' : 'claro'}`}
      onClick={toggle}
    >
      <ThemeIcon aria-hidden $active={value === 'light'}>
        ☀️
      </ThemeIcon>
      <ThemeIcon aria-hidden $active={value === 'dark'}>
        🌙
      </ThemeIcon>
      <ModeLabel>{label}</ModeLabel>
    </SwitcherButton>
  )
}
