'use client';

import { ButtonProps } from '@/types/componentProps';

const Button: React.FC<ButtonProps> = (props) => {
	const { onClick, label, disabled, className } = props;

	return (
		<button onClick={onClick} disabled={disabled} className={className}>
			{label}
		</button>
	);
};

export default Button;
