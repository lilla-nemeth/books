'use client';

import SignInButton from './auth/SignInButton';

const Header: React.FC = () => {
	return (
		<header>
			<div>Books Dashboard</div>
			<div>
				<SignInButton />
			</div>
		</header>
	);
};

export default Header;
