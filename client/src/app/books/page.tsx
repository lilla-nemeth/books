'use client';

import Input from '@/components/generic/Input';
import { Pagination } from '@/components/generic/Pagination';
import { Books, Book } from '@/types/data';
import { fetchBooks } from '@/utils/functions';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
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

	// Fallback image (B option when cover image is unavailable)
	const fallbackImage = '/images/book-cover-fallback-s.webp';

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

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.onerror = null;
		target.src = fallbackImage;
	};

	const returnCards = (bookItems: Books['docs']): React.ReactNode => {
		return (
			<>
				{bookItems.map((item: Book) => (
					<div key={item.key} className='bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2'>
						<div className='min-h-80'>
							{item.cover_i ? (
								<Image
									src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
									alt={item.title}
									width={200}
									height={200}
									onError={handleImageError}
									className='"h-48 w-full object-cover object-end'
								/>
							) : (
								<div className='p-1 h-52 text-xl text-center bg-slate-300 text-slate-600 flex flex-row items-center justify-center font-semibold'>
									Cover Image Unavailable
								</div>
							)}
						</div>
						<div className='p-6'>
							<div className='flex items-baseline'>
								<div className='text-gray-600 text-xs uppercase font-semibold tracking-wide'>
									Publishing Year: {item.first_publish_year}
								</div>
							</div>
							<h4 className='mt-2 font-semibold text-lg leading-tight truncate'>{item.title}</h4>
							<div className='mt-2 text-sm'>{item.author_name}</div>
						</div>
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
		<div className='flex flex-col m-4 antialiased p-8'>
			<Input
				type={'text'}
				placeholder={'Find books...'}
				value={keyword}
				onChange={handleSearchInput}
				inputClassName={
					'bg-gray-50 p-4 border border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
			/>
			<div className='flex flex-wrap min-h-screen pt-8 pb-8 flex items-center justify-center'>
				{loading && <div>Loading books...</div>}
				{error && <div className='error'>{error}</div>}
				{books && returnCards(books)}
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
