'use client';

import Card from '@/components/books/Card';
import Input from '@/components/generic/Input';
import { Pagination } from '@/components/generic/Pagination';
import { useAverageDuration } from '@/context/SearchDurationContext';
import { Books } from '@/types/data';
import { handleImageError, handlePageChange, handleSearchInput } from '@/utils/eventHandlers';
import { fetchBooks } from '@/utils/data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BooksPage: React.FC = () => {
	const { status } = useSession();
	const [books, setBooks] = useState<Books['docs']>([]);
	const [keyword, setKeyword] = useState('Harry Potter');
	const [storedKeyword, setStoredKeyword] = useState(keyword);
	const [page, setPage] = useState<number>(1);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const { setAverageDuration, setTotalDuration, setRequestCount, requestCount } = useAverageDuration();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setStoredKeyword(keyword);
		}, 500);

		return () => clearTimeout(timer);
	}, [keyword]);

	useEffect(() => {
		if (storedKeyword) {
			const limit = 10;
			const offset = (page - 1) * limit;

			if (keyword) {
				fetchBooks(
					setBooks,
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
		}
	}, [storedKeyword, page]);

	return (
		<div className='flex flex-col m-4 antialiased p-8'>
			<div className='flex justify-center p-4 text-500 text-xl font-semibold'>{loading ? 'Books are loading...' : 'Books'}</div>
			{error && <div className='flex justify-center text-500 text-xl font-semibold'>{error}</div>}
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
