const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
	// Fallback image (B option when cover image is unavailable)
	const fallbackImage = '/images/book-cover-fallback-s.webp';
	const target = e.target as HTMLImageElement;

	target.onerror = null;
	target.src = fallbackImage;
};

const handleSearchInput = (
	e: React.ChangeEvent<HTMLInputElement>,
	setKeyword: React.Dispatch<React.SetStateAction<string>>,
	setPage: React.Dispatch<React.SetStateAction<number>>
) => {
	const { value } = e.target;
	setKeyword(value);
	setPage(1);
};

const handlePageChange = (newPage: number, setPage: React.Dispatch<React.SetStateAction<number>>) => {
	setPage(newPage);
};

// After the user pressing Enter the search input can be cleared. Currently unused.
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, setKeyword: React.Dispatch<React.SetStateAction<string>>) => {
	if (e.key === 'Enter') {
		setKeyword('');
	}
};

// For each click inside of the search input the search field can be reseted. Currently unused.
const handleInputClick = (setKeyword: React.Dispatch<React.SetStateAction<string>>) => {
	setKeyword('');
};

export { handleImageError, handleSearchInput, handleKeyDown, handlePageChange, handleInputClick };
