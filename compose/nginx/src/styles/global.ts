import { createGlobalStyle, keyframes } from 'styled-components'

const floatGradient = keyframes`
  0% {
    transform: translate3d(-8%, -6%, 0) scale(1);
  }
  50% {
    transform: translate3d(6%, 8%, 0) scale(1.04);
  }
  100% {
    transform: translate3d(-8%, -6%, 0) scale(1);
  }
`

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    color-scheme: ${(props) => props.theme.name};
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    transition: background 0.4s ease, color 0.4s ease;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }

  ::selection {
    background: ${(props) => props.theme.colors.accentSoft};
  }

  body::before {
    content: '';
    position: fixed;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    background: radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.35), transparent 55%),
      radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.28), transparent 60%),
      radial-gradient(circle at 30% 80%, rgba(165, 180, 252, 0.3), transparent 65%);
    filter: blur(60px);
    opacity: ${(props) => (props.theme.name === 'light' ? 0.65 : 0.5)};
    z-index: -2;
    animation: ${floatGradient} 30s ease-in-out infinite;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background: ${(props) => props.theme.name === 'light' ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 45%, rgba(71,85,105,0.18) 100%)' : 'linear-gradient(130deg, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.2) 45%, rgba(8,18,35,0.72) 100%)'};
    pointer-events: none;
    z-index: -1;
  }
`
