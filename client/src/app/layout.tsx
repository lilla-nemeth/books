'use client';

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import '@/styles/global.css';
import { SearchDurationContextProvider } from '@/context/SearchDurationContext';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<SessionProvider>
					<SearchDurationContextProvider>
						<Header />
						<main>{children}</main>
					</SearchDurationContextProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
