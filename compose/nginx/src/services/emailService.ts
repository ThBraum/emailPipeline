import axios from 'axios'
import type { EmailPayload } from '../types/email'

const api = axios.create({
  baseURL: import.meta.env.VITE_EMAIL_API_URL ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*'
  },
  timeout: 10000
})

export async function sendEmail(payload: EmailPayload) {
  const sanitized: EmailPayload = {
    ...payload,
    idempotencyKey: payload.idempotencyKey || undefined
  }

  const response = await api.post('/emails', sanitized)
  return response.data
}
