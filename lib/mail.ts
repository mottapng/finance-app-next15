import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.SITE_URL}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Please verify your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm.</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.SITE_URL}/auth/reset-password?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  })
}
