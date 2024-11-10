import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useAverageDuration } from '@/context/SearchDurationContext';
import Button from '@/components/generic/Button';
import { useEffect } from 'react';
import { handleSignIn, handleSignOut } from '@/utils/eventHandlers';

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

	return (
		<>
			{session ? (
				<>
					<div>Hi, {session.user?.name}!</div>
					<div>Average Duration: {averageDuration.toFixed(2)} ms</div>
					<Button onClick={() => handleSignOut(status, router)} label={'Sign Out'} />
				</>
			) : (
				<Button onClick={() => handleSignIn('github', '/books')} label={'Sign In'} className='flex ml-auto' />
			)}
		</>
	);
};

export default HeaderContent;
