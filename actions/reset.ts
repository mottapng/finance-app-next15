'use server'

import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'
import { ForgotPasswordSchema, ResetPasswordSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import * as z from 'zod'

export const requestReset = async (
  values: z.infer<typeof ForgotPasswordSchema>,
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email does not match to any account!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: 'Password reset link sent!' }
}

export const newPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Password reset link not found!' }
  }

  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { password, confirmPassword } = validatedFields.data

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match!' }
  }

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid or already used password reset link!' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Password reset link has expired!' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'User email does not exists!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { email: existingToken.email },
    data: { password: hashedPassword },
  })

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Password updated successfully!' }
}
