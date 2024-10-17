'use client'

import { newVerification } from '@/actions/new-verification'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { Icons } from '../icons'
import { useToast } from '../ui/use-toast'

export const NewVerificationForm = () => {
  const { toast } = useToast()

  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token')

  const onSubmit = useCallback(async () => {
    newVerification(token)
      .then((data) => {
        if (data.error)
          toast({
            description: data.error,
            variant: 'destructive',
          })
        else
          toast({
            description: data.success,
          })
      })
      .catch(() => {
        toast({
          description:
            'An error occurred while verifying your email. Please try again.',
          variant: 'destructive',
        })
      })

    router.push('/auth/sign-in')
  }, [token, router, toast])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="w-full mt-10">
      <Icons.spinner className="m-auto h-10 w-10 animate-spin" />
    </div>
  )
}
