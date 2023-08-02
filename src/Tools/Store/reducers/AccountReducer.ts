import { createReducer } from '@reduxjs/toolkit';
import { removeImagesCache } from '../../Utils/Cache';
import { removeFaIconCache } from '@tools/Utils/Cache';
import { login, logout, setUserToken, setLoginDrawer } from '../actions/AccountActions';

const initState: AccountType = {
	error: '',
	loading: false,
	loggedIn: false,
	isLoginDrawerOpen: false,
	user: {
		ID: '',
		name: '',
		token: '',
		email: '',
		username: '',
	},
};

const AccountReducer = createReducer(initState, {
	//? Logout
	[logout.type]: (state, _) => {
		removeFaIconCache();
		removeImagesCache();
		window.user_token = undefined;
		return { ...state, user: null, loading: false, loggedIn: false, error: '', isLoginDrawerOpen: false };
	},

	//? Login
	[login.pending.type]: (state, { payload }) => {
		window.user_token = undefined;
		return { ...state, user: null, loading: true, loggedIn: false, error: '' };
	},
	[login.rejected.type]: (state, { payload }) => {
		window.user_token = undefined;
		return { ...state, user: null, loading: false, loggedIn: false, error: payload.error };
	},
	[login.fulfilled.type]: (state, { payload }) => {
		window.user_token = payload?.token;
		return { ...state, user: payload, loggedIn: true, loading: false, error: '' };
	},

	//? Login modal
	[setLoginDrawer.type]: (state, { payload }) => {
		return { ...state, isLoginDrawerOpen: payload };
	},

	//? set token
	[setUserToken.type]: (state, { payload }) => {
		window.user_token = payload;
		return { ...state, user: { ...state?.user!!, token: payload } };
	},
});

export type UserAccountType = null | {
	ID: string;
	name: string;
	email: string;
	token: string;
	username: string;
	status?: 'ACTIVE' | 'DISABLED';
	CLASS_NAME?: 'VIZ_SYSTEM_USER';
	role?: { isSuper?: boolean; items?: ROLE_ITEM[] };
};

export type AccountType = {
	error: string;
	loading: boolean;
	loggedIn: boolean;
	user: UserAccountType;
	isLoginDrawerOpen: boolean;
};

export type ROLE_ITEM =
	| 'INTRO_TO_DATA_VISUALIZATION'
	| 'CATEGORICAL_DATA'
	| 'NLP'
	| 'NUMERICAL_DATA'
	| 'HIERARCHICAL_DATA'
	| 'TEMPORAL_AND_ORDINAL_DATA'
	| 'VISUAL_STORY_TELLING'
	| 'GEOSPATIAL_DATA'
	| 'VISUALIZE_COMPARISONS'
	| 'SURVEY_DATA'
	| 'ALL';

export default AccountReducer;

export const ACCESSES = {
	ALL: {
		label: 'All',
		children: {
			INTRO_TO_DATA_VISUALIZATION: { label: 'Introduction to Data Visualization' },
			CATEGORICAL_DATA: { label: 'Categorical Data' },
			NLP: { label: 'Natural Language Processing' },
			NUMERICAL_DATA: { label: 'Numerical Data' },
			HIERARCHICAL_DATA: { label: 'Hierarchical Data' },
			TEMPORAL_AND_ORDINAL_DATA: { label: 'Temporal and Ordinal Data' },
			VISUAL_STORY_TELLING: { label: 'Visual Story Telling' },
			GEOSPATIAL_DATA: { label: 'Geospatial Data' },
			VISUALIZE_COMPARISONS: { label: 'Visualize Comparisons' },
			SURVEY_DATA: { label: 'Survey Data' },
		},
	},
};
