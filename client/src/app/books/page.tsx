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
					<div
						key={item.key}
						className='flex flex-col min-h-96 bg-white rounded-lg overflow-hidden shadow-2xl xl:w-1/1 lg:w-1/1 md:w-1/1 sm:w-1/1'
					>
						<div className='flex flex-5'>
							{item.cover_i ? (
								<Image
									src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
									alt={item.title}
									width={200}
									height={200}
									onError={handleImageError}
									className='flex flex-5 flex-col w-full object-cover h-96'
								/>
							) : (
								<div className='flex w-full h-96 bg-slate-300 text-xl text-slate-600 text-center items-center justify-center font-semibold'>
									Cover Image Unavailable
								</div>
							)}
						</div>
						<div className='flex-1 p-6'>
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
					'bg-gray-50 p-4 border border-gray-300 text-gray-900 rounded-md block w-full p-2.5 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-black'
				}
			/>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-8 pb-8'>
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
