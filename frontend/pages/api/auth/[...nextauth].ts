import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt/types';
import Okta from 'next-auth/providers/okta'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Okta({
            clientId: process.env.OKTA_OAUTH2_CLIENT_ID as string,
            clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET as string,
            issuer: process.env.OKTA_OAUTH2_ISSUER as string,
            authorization: { params: { scope: 'openid email profile groups' } },
            profile(profile) {
                return {
                  id: profile.sub,
                  email: profile.email,
                  image: profile.picture,
                  groups: profile.groups,
                }
              }
        }),
    ],
    callbacks: {
        async jwt({ account, token, profile }): Promise<any> {
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
                token.groups = profile.groups
              }
              return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
          session.user.groups = token.groups;
          session.user.id = token.sub;
          session.user.hard = "code";
          return session;
        },
      },
    secret: process.env.SECRET as string
}

export default NextAuth(authOptions)
