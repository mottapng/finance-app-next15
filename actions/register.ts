'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, confirmPassword, firstName, lastName } =
    validatedFields.data

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match!' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'A user with this email already exists!' }
  }

  const name = `${firstName} ${lastName}`

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Confirmation email sent!' }
}

export const hasUserWithEmail = async (email: string) => {
  const existingUser = await getUserByEmail(email)

  return !!existingUser
}
