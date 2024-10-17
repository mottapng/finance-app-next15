'use client'

import { hasUserWithEmail, register } from '@/actions/register'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { SocialAuth } from './social-auth'

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
  const [step, setStep] = useState(0)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const emailSchema = RegisterSchema.shape.email

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleContinueWithEmail = async () => {
    const emailValue = form.getValues('email')

    try {
      emailSchema.parse(emailValue)
      const userAlreadyExists = await hasUserWithEmail(emailValue)

      if (userAlreadyExists) {
        toast({
          description: 'A user with this email already exists!',
          variant: 'destructive',
        })

        return
      }

      form.clearErrors()
      setStep(1)
    } catch (error) {
      if (error instanceof z.ZodError) {
        form.setError('email', {
          message: error.errors[0]?.message || 'Invalid email',
        })
      }
    }
  }

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      register(values).then((data) => {
        if ('error' in data) {
          toast({
            description: data.error,
            variant: 'destructive',
          })
        } else {
          toast({
            description: data.success,
          })
        }
      })
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 0 && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="name@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                onClick={handleContinueWithEmail}
                className="mt-4 w-full"
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue with Email
              </Button>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Max" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Robinson" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="New Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                className="mt-4 w-full"
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create an Account
              </Button>
            </>
          )}
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SocialAuth isPending={isPending} />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
