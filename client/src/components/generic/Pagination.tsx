import Button from './Button';
import { PaginationProps } from '@/types/componentProps';

export const Pagination: React.FC<PaginationProps> = (props) => {
	const { currentPage, totalCount, itemsPerPage, onPageChange, containerClassName } = props;

	const totalPages = Math.ceil(totalCount / itemsPerPage);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className={containerClassName}>
			<Button
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				label={'Prev'}
				className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'
			/>

			<div>
				{currentPage} of {totalPages}
			</div>
			<Button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				label={'Next'}
				className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'
			/>
		</div>
	);
};
