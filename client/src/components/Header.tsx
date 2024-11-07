'use client';
import SignInButton from './auth/SignInButton';

const Header: React.FC = () => {
	return (
		<header className='flex justify-between bg-slate-700 text-white p-4'>
			<SignInButton />
		</header>
	);
};

export default Header;
