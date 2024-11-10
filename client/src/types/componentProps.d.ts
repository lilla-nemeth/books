import { Books } from './data';

interface CardProps {
	bookItems: Books['docs'];
	handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

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
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
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

export type { CardProps, ButtonProps, InputProps, PaginationProps };
