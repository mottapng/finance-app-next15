'use client'

import { SignInForm } from '@/components/auth/sign-in-form'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { getAuthErrorMessage } from '@/lib/errors'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const SignIn = () => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { toast } = useToast()

  const error = searchParams.get('error')
  const success = searchParams.get('success')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (!error && !success) return

    const timeout = setTimeout(() => {
      if (success) {
        toast({
          description: success,
        })

        params.delete('success')
      } else if (error) {
        toast({
          description: getAuthErrorMessage(error),
          variant: 'destructive',
        })

        params.delete('error')
      }

      replace(pathname)
    }, 0)

    return () => clearTimeout(timeout)
  }, [error, success, toast, replace, pathname, searchParams])

  return (
    <>
      <Link
        href="/auth/sign-up"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Register
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Please sign in to continue
        </p>
      </div>
      <SignInForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </Link>
      </p>
    </>
  )
}

export default SignIn
