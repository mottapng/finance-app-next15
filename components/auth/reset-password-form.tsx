'use client'

import { newPassword } from '@/actions/reset'
import { ResetPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        if ('error' in data) {
          toast({
            description: data.error,
            variant: 'destructive',
          })
        } else {
          toast({
            description: data.success,
          })

          router.push('/auth/sign-in')
        }
      })
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New Password"
                        type="password"
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Confirm Password"
                        type="password"
                      />
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
              Send reset email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
