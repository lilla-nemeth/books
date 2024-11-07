'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '@/components/generic/Button';

const SignInButton: React.FC = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Button onClick={() => {}} label={'Loading...'} disabled />;
	}

	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<Button onClick={() => signOut()} label={'Sign out'} />
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<Button onClick={() => signIn('github')} label={'Sign in with GitHub'} />
		</>
	);
};

export default SignInButton;
