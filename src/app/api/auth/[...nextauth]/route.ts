import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

import { signInSchema } from '@/lib/zod';
import { getUserFromDb } from '@/utils/users';

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);

          if (!user) {
            throw new Error('Не правильный логин или пароль');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Не правильный логин или пароль');
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// App Router requires explicit exports
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
