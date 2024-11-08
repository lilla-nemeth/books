export async function GET(request: { url: string | URL }) {
	try {
		const url = new URL(request.url);
		const searchTerm = url.searchParams.get('searchTerm') || '';
		const limit = parseInt(url.searchParams.get('limit') || '10');
		const offset = parseInt(url.searchParams.get('offset') || '0');

		if (!searchTerm) {
			return new Response(JSON.stringify({ error: 'Search term is required' }), { status: 400 });
		}

		const API_URL = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}&limit=${limit}&offset=${offset}`;

		const response = await fetch(API_URL);

		if (!response.ok) {
			const errorData = await response.json();
			return new Response(JSON.stringify(errorData), { status: response.status });
		}

		const responseData = await response.json();

		return new Response(JSON.stringify(responseData), { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
	}
}
