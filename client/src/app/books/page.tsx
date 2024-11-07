'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Books = () => {
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return <div>Content</div>;
};

export default Books;
