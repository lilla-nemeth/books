'use client';

import HeaderContent from './auth/HeaderContent';

const Header: React.FC = () => {
	return (
		<header className='flex justify-between bg-slate-700 text-white p-4'>
			<HeaderContent />
		</header>
	);
};

export default Header;
