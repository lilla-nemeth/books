import { useSession, signIn, signOut } from 'next-auth/react';
import { useAverageDuration } from '@/context/SearchDurationContext';
import Button from '@/components/generic/Button';

const HeaderContent: React.FC = () => {
	const { data: session } = useSession();
	const { averageDuration } = useAverageDuration();

	return (
		<>
			{session ? (
				<>
					<div>Hi, {session.user?.name}!</div>
					<div>Average Duration: {averageDuration.toFixed(2)} ms</div>
					<Button onClick={() => signOut()} label={'Sign Out'} />
				</>
			) : (
				<Button onClick={() => signIn('github', { callbackUrl: '/books' })} label={'Sign In'} className='flex ml-auto' />
			)}
		</>
	);
};

export default HeaderContent;
