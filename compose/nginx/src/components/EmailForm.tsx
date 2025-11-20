import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { styled, keyframes } from 'styled-components'
import type { EmailPayload } from '../types/email'

const appear = keyframes`
  from {
    transform: translateY(18px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const FormWrapper = styled.section`
  display: grid;
  gap: clamp(1.4rem, 3vw, 1.9rem);
  max-width: min(720px, 92vw);
  margin: 0 auto;
  padding: clamp(1.5rem, 5vw, 2.75rem);
  border-radius: clamp(1.5rem, 4vw, 2.5rem);
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadows.md};
  backdrop-filter: blur(22px);
  position: relative;
  overflow: hidden;
  animation: ${appear} 0.6s ease both;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%, rgba(76,110,245,0.08) 100%);
    pointer-events: none;
  }
`

const Header = styled.header`
  display: grid;
  gap: 0.5rem;

  h1 {
    font-size: clamp(1.8rem, 3.4vw, 2.55rem);
    font-weight: 600;
    letter-spacing: -0.015em;
    margin: 0;
    color: ${(props) => props.theme.colors.text};
  }

  p {
    margin: 0;
    font-size: clamp(0.95rem, 2.4vw, 1.05rem);
    color: ${(props) => props.theme.colors.textMuted};
    max-width: 48ch;
  }
`

const Eyebrow = styled.span`
  font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 0.78rem;
`

const FieldsGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 2.4vw, 1.4rem);
`

const Field = styled.label<{ $invalid?: boolean }>`
  display: grid;
  gap: 0.55rem;
  position: relative;

  span {
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: -0.01em;
    color: ${(props) => props.theme.colors.text};
  }

  small {
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 0.8rem;
    line-height: 1.35;
  }

  textarea,
  input {
    width: 100%;
    border: 1px solid
      ${(props) =>
        props.$invalid ? props.theme.colors.error : props.theme.colors.border};
    border-radius: 1rem;
    padding: 0.9rem 1.05rem;
    font-size: 1rem;
    font-family: inherit;
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.inputBackground};
    box-shadow: ${(props) => (props.$invalid ? '0 0 0 3px rgba(240, 82, 82, 0.15)' : '0 14px 45px rgba(15, 23, 42, 0.07)')};
    backdrop-filter: blur(12px);
    transition:
      border 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.accent};
      box-shadow: 0 0 0 4px ${(props) => props.theme.colors.accentSoft};
      transform: translateY(-2px);
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.textMuted};
      opacity: 0.7;
    }
  }

  textarea {
    min-height: clamp(8.5rem, 22vw, 12rem);
    resize: vertical;
  }
`

const ErrorText = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.78rem;
  margin-top: -0.25rem;
`

const Actions = styled.div`
  display: grid;
  gap: 0.8rem;
  justify-items: flex-start;

  @media (max-width: 640px) {
    justify-items: stretch;
  }
`

const sendPulse = keyframes`
  0% {
    transform: translateY(0);
    box-shadow: 0 18px 30px rgba(76, 110, 245, 0.38);
  }
  50% {
    transform: translateY(-2px);
    box-shadow: 0 25px 36px rgba(76, 110, 245, 0.45);
  }
  100% {
    transform: translateY(0);
    box-shadow: 0 18px 30px rgba(76, 110, 245, 0.38);
  }
`

const Button = styled.button<{ $loading?: boolean }>`
  position: relative;
  padding: 0.95rem 1.8rem;
  border-radius: 999px;
  border: none;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(130deg, ${(props) => props.theme.colors.accent}, #9b5cf5);
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
  box-shadow: ${(props) => props.theme.shadows.glow};

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
    animation: ${sendPulse} 1.8s ease infinite;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    animation: none;
    transform: none;
    filter: none;
  }

  &:focus-visible {
    outline: 3px solid ${(props) => props.theme.colors.accentSoft};
    outline-offset: 4px;
  }
`

const LoadingIndicator = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
`

const ButtonLabel = styled.span<{ $hidden?: boolean }>`
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transition: opacity 0.2s ease;
`

const HelperText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.textMuted};
`

type EmailErrors = Partial<Record<keyof EmailPayload, string>>

type EmailFormProps = {
  onSendEmail: (payload: EmailPayload) => Promise<boolean>
}

const createInitialState = (): EmailPayload => ({
  to: '',
  subject: '',
  body: '',
  idempotencyKey: ''
})

export function EmailForm({ onSendEmail }: EmailFormProps) {
  const [form, setForm] = useState<EmailPayload>(createInitialState)
  const [errors, setErrors] = useState<EmailErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const helperTexts = useMemo(
    () => ({
      to: 'Informe um endereço de email válido do destinatário.',
      subject: 'Seja objetivo: descreva o conteúdo principal em poucas palavras.',
      body: 'Conte-nos a mensagem completa. Você pode utilizar parágrafos curtos para facilitar a leitura.',
      idempotencyKey:
        'Use uma chave única para evitar envios duplicados (opcional, mas recomendado em integrações).'
    }),
    []
  )

  const validate = (payload: EmailPayload) => {
    const nextErrors: EmailErrors = {}

    if (!payload.to.trim()) {
      nextErrors.to = 'O destinatário é obrigatório.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/iu.test(payload.to.trim())) {
      nextErrors.to = 'Informe um endereço de email válido.'
    }

    if (!payload.subject.trim()) {
      nextErrors.subject = 'O assunto é obrigatório.'
    }

    if (!payload.body.trim()) {
      nextErrors.body = 'O corpo da mensagem não pode ficar vazio.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmedPayload: EmailPayload = {
      to: form.to.trim(),
      subject: form.subject.trim(),
      body: form.body.trim(),
      idempotencyKey: form.idempotencyKey?.trim() || undefined
    }

    const nextErrors = validate(trimmedPayload)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const succeeded = await onSendEmail(trimmedPayload)
      if (succeeded) {
        setErrors({})
        setForm(createInitialState())
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormWrapper aria-live="polite">
      <Header>
        <Eyebrow>Smart Delivery</Eyebrow>
        <h1>Crie emails memoráveis com poucos cliques</h1>
        <p>
          Um painel moderno, inspirado por conceitos de IA, para compor campanhas personalizadas com visual impecável e feedback em tempo real.
        </p>
      </Header>

      <form onSubmit={handleSubmit} noValidate>
        <FieldsGrid>
          <Field $invalid={Boolean(errors.to)}>
            <span>Destinatário</span>
            <input
              id="to"
              name="to"
              type="email"
              autoComplete="email"
              placeholder="ex.: pessoa@empresa.com"
              value={form.to}
              onChange={(event) => setForm((prev) => ({ ...prev, to: event.target.value }))}
              aria-describedby="to-helper"
              aria-invalid={Boolean(errors.to)}
              required
            />
            <small id="to-helper">{helperTexts.to}</small>
            {errors.to && <ErrorText role="alert">{errors.to}</ErrorText>}
          </Field>

          <Field $invalid={Boolean(errors.subject)}>
            <span>Assunto</span>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="ex.: Atualização importante da sua assinatura"
              value={form.subject}
              onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
              aria-describedby="subject-helper"
              aria-invalid={Boolean(errors.subject)}
              required
            />
            <small id="subject-helper">{helperTexts.subject}</small>
            {errors.subject && <ErrorText role="alert">{errors.subject}</ErrorText>}
          </Field>

          <Field $invalid={Boolean(errors.body)}>
            <span>Mensagem</span>
            <textarea
              id="body"
              name="body"
              placeholder={`Saudações!\n\nEscreva aqui o conteúdo do email com clareza e objetividade...`}
              value={form.body}
              onChange={(event) => setForm((prev) => ({ ...prev, body: event.target.value }))}
              aria-describedby="body-helper"
              aria-invalid={Boolean(errors.body)}
              required
            />
            <small id="body-helper">{helperTexts.body}</small>
            {errors.body && <ErrorText role="alert">{errors.body}</ErrorText>}
          </Field>

          <Field>
            <span>Chave de idempotência</span>
            <input
              id="idempotencyKey"
              name="idempotencyKey"
              type="text"
              placeholder="ex.: 9b824dc8-3b7c-4c91-9c47-52a8132e4a6d"
              value={form.idempotencyKey ?? ''}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, idempotencyKey: event.target.value }))
              }
              aria-describedby="idempotency-helper"
            />
            <small id="idempotency-helper">{helperTexts.idempotencyKey}</small>
          </Field>
        </FieldsGrid>

        <Actions>
          <Button type="submit" disabled={isSubmitting} aria-live="assertive">
            {isSubmitting && <LoadingIndicator aria-hidden>⌛</LoadingIndicator>}
            <ButtonLabel $hidden={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar email'}
            </ButtonLabel>
          </Button>
          <HelperText>
            Ao enviar, o sistema confirma o status em tempo real com notificações inteligentes.
          </HelperText>
        </Actions>
      </form>
    </FormWrapper>
  )
}
