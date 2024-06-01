import { TCredentials } from '@/types/common.types';
import axios from 'axios';
import CredentialProvider from 'next-auth/providers/credentials';
import {
  default as nextauth_secret,
  default as server_local_url,
} from '../app/config/index';

export const authOptions = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as TCredentials;
          const res = await axios.post(`${server_local_url}/auth/login`, {
            email,
            password,
          });
          if (res.data.user) {
            console.log(res);
            return { ...res.data.user, token: res.data.token };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ session, token, user }: any) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: nextauth_secret,
};
