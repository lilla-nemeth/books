import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '@/components/generic/Button';

const SignInButton: React.FC = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Button onClick={() => {}} label={'Loading...'} disabled className='flex justify-end' />;
	}

	if (session) {
		return (
			<>
				Hi, {session.user?.name}! <br />
				<Button onClick={() => signOut()} label={'Sign Out'} />
			</>
		);
	} else {
		return (
			<>
				<Button onClick={() => signIn('github', { callbackUrl: '/books' })} label={'Sign In'} className='flex justify-end' />
			</>
		);
	}
};

export default SignInButton;
