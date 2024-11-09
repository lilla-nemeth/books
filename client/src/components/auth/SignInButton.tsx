import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '@/components/generic/Button';

const SignInButton: React.FC = () => {
	const { data: session } = useSession();

	return (
		<>
			{session && `Hi, ${session.user?.name}!`}
			{session ? (
				<Button onClick={() => signOut()} label={'Sign Out'} />
			) : (
				<Button onClick={() => signIn('github', { callbackUrl: '/books' })} label={'Sign In'} className='flex ml-auto' />
			)}
		</>
	);
};

export default SignInButton;
