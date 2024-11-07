'use client';

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<SessionProvider>
					<Header />
					<main>{children}</main>
				</SessionProvider>
			</body>
		</html>
	);
}
