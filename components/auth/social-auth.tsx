'use client'

import { DEFAULT_LOGIN_REDIRECT } from '@/constants/routes'
import { signIn } from 'next-auth/react'
import { Icons } from '../icons'
import { Button } from '../ui/button'

export const SocialAuth = ({ isPending }: { isPending: boolean }) => {
  const handleSocialLogin = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        className="flex-1"
        onClick={() => handleSocialLogin('google')}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={isPending}
        className="flex-1"
        onClick={() => handleSocialLogin('github')}
      >
        <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
      </Button>
    </div>
  )
}
