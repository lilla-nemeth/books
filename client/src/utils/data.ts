import { Books } from '@/types/data';
import { Dispatch, SetStateAction } from 'react';

const calculateCallDuration = (
	startNum: number,
	endNum: number,
	requestCount: number,
	setTotal: Dispatch<SetStateAction<number>>,
	setReqCount: Dispatch<SetStateAction<number>>,
	setAvgDuration: Dispatch<SetStateAction<number>>
): number => {
	const duration = endNum - startNum;

	setTotal((prevTotal) => prevTotal + duration);
	setReqCount((prevCount) => prevCount + 1);
	setAvgDuration((prevAvg) => (prevAvg * requestCount + duration) / (requestCount + 1));

	return duration;
};

const fetchBooks = async (
	setBooks: Dispatch<SetStateAction<Books['docs']>>,
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

		calculateCallDuration(startTime, endTime, requestCount, setTotalDuration, setRequestCount, setAverageDuration);

		setBooks(data.docs);
		setTotalCount(data.numFound || 0);
	} catch (err) {
		setError((err as Error).message);
	}

	setLoading(false);
};

export { fetchBooks };
