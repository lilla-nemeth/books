'use client';

import Input from '@/components/generic/Input';
import { Pagination } from '@/components/generic/Pagination';
import { Books, Book } from '@/types/data';
import { fetchBooks } from '@/utils/functions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BooksPage = () => {
	const { status } = useSession();
	const [books, setBooks] = useState<Books['docs']>([]);
	const [, setFilteredBooksApiData] = useState<Books['docs']>([]);
	const [keyword, setKeyword] = useState('Animal Farm');
	const [page, setPage] = useState<number>(1);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	useEffect(() => {
		const limit = 10;
		const offset = (page - 1) * limit;

		if (keyword) {
			fetchBooks(setBooks, books, setFilteredBooksApiData, keyword, offset, limit, setError, setTotalCount, setLoading);
		}
	}, [keyword, page]);

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	const returnCards = (bookItems: Books['docs']): React.ReactNode => {
		return (
			<>
				{bookItems.map((item: Book) => (
					<div key={item.key}>
						<div>{item.title}</div>
						<div>{item.author_name}</div>
						<hr></hr>
					</div>
				))}
			</>
		);
	};

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
		setPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<div className='flex flex-col m-4'>
			<Input
				type={'text'}
				placeholder={'Find books...'}
				value={keyword}
				onChange={handleSearchInput}
				inputClassName={
					'bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
			/>
			<div>
				{loading && <div>Loading books...</div>}
				{error && <div className='error'>{error}</div>}
				{returnCards(books)}
			</div>
			<Pagination
				currentPage={page}
				totalCount={totalCount}
				itemsPerPage={10}
				onPageChange={handlePageChange}
				containerClassName={'flex justify-between mt-4 mb-4'}
			/>
		</div>
	);
};

export default BooksPage;
