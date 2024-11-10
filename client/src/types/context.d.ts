interface SearchDurationContextType {
	averageDuration: number;
	setAverageDuration: React.Dispatch<React.SetStateAction<number>>;
	totalDuration: number;
	setTotalDuration: React.Dispatch<React.SetStateAction<number>>;
	requestCount: number;
	setRequestCount: React.Dispatch<React.SetStateAction<number>>;
}

export type { SearchDurationContextType };
