'use client';

import React, { createContext, useContext, useState } from 'react';
import { SearchDurationContextType } from '@/types/context';

const SearchDurationContext = createContext<SearchDurationContextType | undefined>(undefined);

export const SearchDurationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [requestCount, setRequestCount] = useState(0);
	const [averageDuration, setAverageDuration] = useState(0);
	const [totalDuration, setTotalDuration] = useState(0);

	return (
		<SearchDurationContext.Provider
			value={{ averageDuration, setAverageDuration, totalDuration, setTotalDuration, requestCount, setRequestCount }}
		>
			{children}
		</SearchDurationContext.Provider>
	);
};

export const useAverageDuration = (): SearchDurationContextType => {
	const context = useContext(SearchDurationContext);

	if (!context) {
		throw new Error('useAverageDuration has to be within SearchDurationContextProvider');
	}

	return context;
};
