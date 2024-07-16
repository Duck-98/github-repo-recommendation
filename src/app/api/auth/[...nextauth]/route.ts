import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { supabase } from '@lib/supabaseClient';

export const authOptions: NextAuthOptions = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        session.accessToken = token.accessToken as string;
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.accessToken;
        }
        return token;
      },
      async signIn({ user, account, profile }) {
        
        const { data, error } = await supabase
        .from('users')
        .upsert(
          [{ id: user.id, email: user.email }],
          { onConflict: 'id' }
        );

        if (error) {
          console.error('Error upserting user:', error.message);
          return false;
        }
  
        return true;
      },
    },
  };

export default NextAuth(authOptions);
