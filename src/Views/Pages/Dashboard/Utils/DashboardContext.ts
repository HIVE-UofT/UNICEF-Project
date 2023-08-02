import { createContext, useContext } from 'react';
import { useAdvancedState } from 'ahq-front-tools';

type DC_TYPE = { state: ReturnType<typeof useAdvancedState>; [key: string]: any };

export const DashboardContext = createContext<DC_TYPE>({} as any);

export const DashboardProvider = DashboardContext.Provider;

export const useDashboardContext = () => {
	const ctx = useContext(DashboardContext);
	return { ...ctx };
};
