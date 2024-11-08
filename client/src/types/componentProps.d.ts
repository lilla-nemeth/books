interface ButtonProps {
	onClick: () => void;
	label: string;
	disabled?: boolean;
	className?: string;
}

interface PaginationProps {
	currentPage: number;
	totalCount: number;
	itemsPerPage: number;
	onPageChange: (newPage: number) => void;
	containerClassName?: string;
}

export type { ButtonProps, PaginationProps };
