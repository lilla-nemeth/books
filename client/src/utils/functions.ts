import { Books } from '@/types/data';
import { Dispatch, SetStateAction } from 'react';

const fetchBooks = async (
	setBooks: Dispatch<SetStateAction<Books['docs']>>,
	books: Books['docs'],
	setFilteredBooksData: Dispatch<SetStateAction<Books['docs']>>,
	keyword: string,
	setError: Dispatch<SetStateAction<string | null>>
) => {
	try {
		const res = await fetch(`/api/books?searchTerm=${encodeURIComponent(keyword)}`);

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || 'Failed to fetch books');
		}
		const data: Books = await res.json();

		setBooks(data.docs);
		setFilteredBooksData(books);
	} catch (err) {
		setError((err as Error).message);
	}
};

export { fetchBooks };
