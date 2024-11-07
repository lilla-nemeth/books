'use client';

interface ButtonProps {
	onClick: () => void;
	label: string;
	disabled?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
	const { onClick, label, disabled, className } = props;

	return (
		<button onClick={onClick} disabled={disabled} className={className}>
			{label}
		</button>
	);
};

export default Button;
