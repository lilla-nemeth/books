'use client';

import { Books, Book } from '@/types/data';
import { fetchBooks } from '@/utils/functions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BooksPage = () => {
	const [books, setBooks] = useState<Books['docs']>([]);
	const [, setFilteredBooksApiData] = useState<Books['docs']>([]);
	const [keyword] = useState('Animal Farm');
	const [error, setError] = useState<string | null>(null);
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	}, [status, router]);

	useEffect(() => {
		if (keyword) {
			fetchBooks(setBooks, books, setFilteredBooksApiData, keyword, setError);
		}
	}, [keyword]);

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

	if (error) {
		return <div className=''>{error}</div>;
	}

	return <div>{returnCards(books)}</div>;
};

export default BooksPage;
