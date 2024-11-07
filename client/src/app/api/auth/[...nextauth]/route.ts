import NextAuth, { NextAuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';

declare module 'next-auth' {
	interface Session {
		user: {
			id?: string;
			email?: string;
			accessToken?: string;
			name?: string;
		};
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		Github({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET as string,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account && user) {
				token.accessToken = account.access_token;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.id) {
				session.user.id = token.id as string;
			}
			if (token.accessToken) {
				session.user.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
