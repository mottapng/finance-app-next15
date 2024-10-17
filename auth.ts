import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { db } from '@/lib/db'
import { UserRole } from '@prisma/client'
import authConfig from './auth.config'
import { getUserById } from './data/user'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in',
  },
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        return true
      }

      if (typeof user.id !== 'string') return false

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
