import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const ResetPassword = () => {
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
          Reset Your Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Please enter your new password below.
        </p>
      </div>
      <ResetPasswordForm />
    </>
  )
}

export default ResetPassword
