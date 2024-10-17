import * as z from 'zod'

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password is required' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password confirmation is required' }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password is required' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password confirmation is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
})
