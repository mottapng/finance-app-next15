'use server'

import * as z from 'zod'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/constants/routes'
import { getUserByEmail } from '@/data/user'
import { getAuthErrorMessage } from '@/lib/errors'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid email or password!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return {
      error: 'Please verify your email! Another confirmation email was sent.',
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage = getAuthErrorMessage(error.type)
      return { error: errorMessage }
    }

    throw error
  }
}
