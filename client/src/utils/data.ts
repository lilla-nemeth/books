import { Books } from '@/types/data';
import { Dispatch, SetStateAction } from 'react';

const fetchBooks = async (
	setBooks: Dispatch<SetStateAction<Books['docs']>>,
	books: Books['docs'],
	setFilteredBooksData: Dispatch<SetStateAction<Books['docs']>>,
	searchTerm: string,
	offset: number,
	limit: number,
	setError: Dispatch<SetStateAction<string | null>>,
	setTotalCount: Dispatch<SetStateAction<number>>,
	setLoading: Dispatch<SetStateAction<boolean>>,
	setTotalDuration: Dispatch<SetStateAction<number>>,
	requestCount: number,
	setRequestCount: Dispatch<SetStateAction<number>>,
	setAverageDuration: Dispatch<SetStateAction<number>>
) => {
	setError(null);
	setLoading(true);

	const startTime = Date.now();

	try {
		const res = await fetch(`/api/books?searchTerm=${encodeURIComponent(searchTerm)}&limit=${limit}&offset=${offset}`);

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || 'Failed to fetch books');
		}
		const data: Books = await res.json();

		const endTime = Date.now();
		const duration = endTime - startTime;

		setTotalDuration((prevTotal) => prevTotal + duration);
		setRequestCount((prevCount) => prevCount + 1);
		setAverageDuration((prevAvg) => (prevAvg * requestCount + duration) / (requestCount + 1));

		setBooks(data.docs);
		setFilteredBooksData(books);
		setTotalCount(data.numFound || 0);
	} catch (err) {
		setError((err as Error).message);
	}
	setLoading(false);
};

export { fetchBooks };
