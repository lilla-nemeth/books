import NextAuth, { NextAuthOptions } from 'next-auth';
import Github from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
	providers: [
		Github({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
};

export default NextAuth(authOptions);
