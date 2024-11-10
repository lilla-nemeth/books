'use client';

import Card from '@/components/books/Card';
import Input from '@/components/generic/Input';
import { Pagination } from '@/components/generic/Pagination';
import { useAverageDuration } from '@/context/SearchDurationContext';
import { Books } from '@/types/data';
import { handleImageError, handlePageChange, handleSearchInput } from '@/utils/eventHandlers';
import { fetchBooks } from '@/utils/functions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BooksPage: React.FC = () => {
	const { status } = useSession();
	const [books, setBooks] = useState<Books['docs']>([]);
	const [, setFilteredBooksApiData] = useState<Books['docs']>([]);
	const [keyword, setKeyword] = useState('Animal Farm');
	const [page, setPage] = useState<number>(1);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const { setAverageDuration, setTotalDuration, setRequestCount, requestCount } = useAverageDuration();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	useEffect(() => {
		const limit = 10;
		const offset = (page - 1) * limit;

		if (keyword) {
			fetchBooks(
				setBooks,
				books,
				setFilteredBooksApiData,
				keyword,
				offset,
				limit,
				setError,
				setTotalCount,
				setLoading,
				setTotalDuration,
				requestCount,
				setRequestCount,
				setAverageDuration
			);
		}
	}, [keyword, page]);

	return (
		<div className='flex flex-col m-4 antialiased p-8'>
			<Input
				type={'text'}
				placeholder={'Find books...'}
				value={keyword}
				onChange={(e) => handleSearchInput(e, setKeyword, setPage)}
				inputClassName={
					'bg-gray-50 p-4 border border-gray-300 text-gray-900 rounded-md block w-full p-2.5 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-black'
				}
			/>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-8 pb-8'>
				{error && <div className='error'>{error}</div>}
				{books && <Card bookItems={books} handleImageError={(e) => handleImageError(e)} />}
			</div>
			<Pagination
				currentPage={page}
				totalCount={totalCount}
				itemsPerPage={10}
				onPageChange={(newPage) => handlePageChange(newPage, setPage)}
				containerClassName={'flex justify-between mt-4 mb-4'}
			/>
		</div>
	);
};

export default BooksPage;
