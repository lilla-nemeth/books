import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useAverageDuration } from '@/context/SearchDurationContext';
import Button from '@/components/generic/Button';
import { useEffect } from 'react';

const HeaderContent: React.FC = () => {
	const { data: session, status } = useSession();
	const { averageDuration } = useAverageDuration();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (pathname === '/') {
			if (session) {
				signOut({ redirect: false });
			}
		}
	}, [pathname, session]);

	const handleSignIn = async () => {
		await signIn('github', { callbackUrl: '/books' });
	};

	const handleSignOut = async () => {
		await signOut({ redirect: false });

		if (status === 'unauthenticated') {
			router.push('/');
		}
	};

	return (
		<>
			{session ? (
				<>
					<div>Hi, {session.user?.name}!</div>
					<div>Average Duration: {averageDuration.toFixed(2)} ms</div>
					<Button onClick={handleSignOut} label={'Sign Out'} />
				</>
			) : (
				<Button onClick={handleSignIn} label={'Sign In'} className='flex ml-auto' />
			)}
		</>
	);
};

export default HeaderContent;
