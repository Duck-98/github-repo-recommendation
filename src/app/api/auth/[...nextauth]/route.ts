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
        console.log(data,"Data")

        if (error) {
          console.log(error,"err")
          console.error('Error upserting user:', error.message);
          return false;
        }
  
        return true;
      },
      async redirect({ url, baseUrl }) {

        // if (url.startsWith("/")) return `${baseUrl}${url}`
        // // Allows callback URLs on the same origin
        // else if (new URL(url).origin === baseUrl) return url
        // return baseUrl

        return '/'
      }

    },
    pages:{
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error',
      newUser: '/auth/new-user',
    },
   
  };

  const handler = NextAuth(authOptions);

  export { handler as GET, handler as POST };
