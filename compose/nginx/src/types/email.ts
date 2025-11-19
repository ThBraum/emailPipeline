export interface EmailPayload {
  to: string
  subject: string
  body: string
  idempotencyKey?: string
}
