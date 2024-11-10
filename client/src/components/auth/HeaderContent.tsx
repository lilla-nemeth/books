import { useSession, signIn, signOut } from 'next-auth/react';
import { useAverageDuration } from '@/context/SearchDurationContext';
import Button from '@/components/generic/Button';

const HeaderContent: React.FC = () => {
	const { data: session } = useSession();
	const { averageDuration } = useAverageDuration();

	return (
		<>
			{session && `Hi, ${session.user?.name}!`}
			{session && <div>Average Duration: {averageDuration.toFixed(2)} ms</div>}
			{session ? (
				<Button onClick={() => signOut()} label={'Sign Out'} />
			) : (
				<Button onClick={() => signIn('github', { callbackUrl: '/books' })} label={'Sign In'} className='flex ml-auto' />
			)}
		</>
	);
};

export default HeaderContent;
