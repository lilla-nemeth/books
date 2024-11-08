interface ButtonProps {
	onClick: () => void;
	label: string;
	disabled?: boolean;
	className?: string;
}

type InputType =
	| 'text'
	| 'search'
	| 'number'
	| 'password'
	| 'email'
	| 'tel'
	| 'url'
	| 'date'
	| 'time'
	| 'file'
	| 'checkbox'
	| 'radio'
	| 'range'
	| 'submit';

interface InputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	type: InputType;
	placeholder: string;
	value: string;
	inputClassName?: string;
	labelClassName?: string;
	label?: string;
}

interface PaginationProps {
	currentPage: number;
	totalCount: number;
	itemsPerPage: number;
	onPageChange: (newPage: number) => void;
	containerClassName?: string;
}

export type { ButtonProps, InputProps, PaginationProps };
