import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ForgotPassword = () => {
  return (
    <>
      <Link
        href="/auth/sign-in"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Login
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot your password?
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email to receive a password reset link
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPassword
