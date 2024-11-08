interface Books {
	docs: Book[];
	numFound?: number;
	numFoundExact?: boolean;
	num_found?: number;
	offset?: null;
	q?: string;
	start?: number;
}

interface Book {
	key: string;
	title: string;
	author_name: string[];
	first_publish_year: number;
	cover_id: number;
	subject?: string[];
	isbn?: string[];
	publish_date?: string[];
	publisher?: string[];
}

export type { Books, Book };
