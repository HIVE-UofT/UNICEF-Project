import { createReducer } from '@reduxjs/toolkit';
import { setLoading, setUploadProgress, setActiveNavKey } from '../actions/DashboardActions';

type InitStateType = { isLoading: boolean; uploadProgress: number; activeNavKey: string };

const initState: InitStateType = { isLoading: false, uploadProgress: 0, activeNavKey: 'home' };

const DashboardReducer = createReducer(initState, {
	//* upload progress
	[setUploadProgress.type]: (state, { payload }) => ({ ...state, uploadProgress: payload }),

	//* loading
	[setLoading.type]: (state, { payload }) => ({ ...state, isLoading: payload }),

	//* active nav key
	[setActiveNavKey.type]: (state, { payload }) => ({ ...state, activeNavKey: payload }),
});

export default DashboardReducer;
