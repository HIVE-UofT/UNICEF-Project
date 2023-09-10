// import { CONFIG } from '@config/constants';
// import { isEmail } from '../../Utils/String';
// import { authFetch } from '../../Hooks/useFetch';
// import { createHashId } from '@tools/Utils/String';
// import { clearLocalStorage } from './LocalStorageActions';
import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {CONFIG} from '@src/App/Config/constants';
import {authFetch} from '@src/Tools/Hooks/useFetch';
import {createHashId} from '@src/Tools/Utils/ID';
import {Notify} from '@src/Tools/Utils/React';
import {clearLocalStorage} from './LocalStorageActions';

const LOGIN_ERROR_MESSAGE = 'Email and password are invalid';

//*---------------------- 👇 Actions -------------------------------------------------

//* Login drawer
export const setLoginDrawer = createAction<boolean>('setLoginDrawer');

//* LogOut
export const logout = createAction('logout');

//* Set Token
export const setUserToken = createAction<string>('setUserToken');

export const UserAuthApi = "http://ml.hivelab-uoft.ca:9078/api/auth"
//* Login
export const login = createAsyncThunk<any, { username: any; password: any }>(
    'login',
    async ({username, password}, {rejectWithValue, dispatch}) => {
        let data: any;

        try {
            const {json} = await authFetch.post(`${UserAuthApi}/signin`, {
                body: {
                    email : username,
                    password : password
                },
                base: false,
            });
            data = json;
            console.log("login data",data)
            if (!data || data?.error) return rejectWithValue({error: data?.message || ''});
            Notify.success('You logged in successfully!');
            const isEqualPrev = isEqualToPrevUserInfo(data);
            if (!isEqualPrev) await new Promise(resolve => resolve(dispatch(clearLocalStorage())));
        } catch (e: any) {
            return rejectWithValue({error: navigator.onLine ? LOGIN_ERROR_MESSAGE : e?.message});
        }

        return data?.item;
    }
);


const isEqualToPrevUserInfo = (data: any) => {
    const lsName = `${CONFIG.APP_SHORT_NAME}-UA`;
    const prevHash = localStorage.getItem(lsName);
    const userData = {name: data?.username, token: data?.token};
    const userIdHash = createHashId(JSON.stringify(userData));
    const isEqual = !!prevHash && userIdHash === prevHash;
    if (!isEqual) {
        localStorage.setItem(lsName, userIdHash);
        localStorage.removeItem('redirect-path-after-auth');
    }
    return isEqual;
};

// export const login = createAsyncThunk<any, { username: any; password: any }>(
// 	'login',
// 	async ({ username, password }, { rejectWithValue, dispatch }) => {
// 		let data: any;

// 		//TODO: connecting login to server

// 		try {
// 			await new Promise((res, rej) => {
// 				setTimeout(() => {
// 					if (username === 'HAD7001H' && password === 'uoft2023') {
// 						Notify.success('You logged in successfully!');
// 						res(data);
// 						data = { username, password, token: 'test' };
// 					}
// 					rej();
// 				}, 1000);
// 			});
// 		} catch (e: any) {
// 			return rejectWithValue({ error: navigator.onLine ? LOGIN_ERROR_MESSAGE : e?.message });
// 		}

// 		return data;
// 	}
// );
