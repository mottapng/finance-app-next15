'use client'

import * as z from 'zod'

import { login } from '@/actions/login'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { SocialAuth } from './social-auth'

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SignInForm = ({ className, ...props }: SignInFormProps) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast({
            description: data.error,
            variant: 'destructive',
          })
        }
      })
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <SocialAuth isPending={isPending} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="name@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input {...field} placeholder="******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isPending} className="mt-2">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
