'use client'

import { requestReset } from '@/actions/reset'
import { ForgotPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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

export const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const router = useRouter()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      requestReset(values).then((data) => {
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
