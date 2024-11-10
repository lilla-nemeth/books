const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
	const target = e.target as HTMLImageElement;
	// Fallback image (B option when cover image is unavailable)
	const fallbackImage = '/images/book-cover-fallback-s.webp';

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

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, setKeyword: React.Dispatch<React.SetStateAction<string>>) => {
	if (e.key === 'Enter') {
		setKeyword('');
	}
};

const handleInputClick = (setKeyword: React.Dispatch<React.SetStateAction<string>>) => {
	setKeyword('');
};

export { handleImageError, handleSearchInput, handleKeyDown, handlePageChange, handleInputClick };
