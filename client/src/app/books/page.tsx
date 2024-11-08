'use client';

import Pagination from '@/components/generic/Pagination';
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

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	return (
		<div className='flex flex-col m-4'>
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
