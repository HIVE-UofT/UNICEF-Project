import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import DashboardReducer from './DashboardReducer';
import { CONFIG } from './../../../App/Config/constants';
import createCompressor from 'redux-persist-transform-compress';

const compressor = createCompressor();

const reducers = combineReducers({
	dashboard: DashboardReducer,
	account: persistReducer(
		{
			storage,
			key: 'account',
			blacklist: ['error', 'loading', 'isLoginDrawerOpen'],
			keyPrefix: `${CONFIG.APP_SHORT_NAME}-`,
			transforms: [compressor] as any,
		},
		AccountReducer
	),
});

export default reducers;
