import useStore from '../Store/useStore';
import { useRef, useEffect } from 'react';
import { jwtDecode } from '../Utils/String';
import { setLoginDrawer } from '../Store/actions/AccountActions';

const useAccount = () => {
	const { selector, dispatch } = useStore();
	const account = selector(s => s.account);

	//? Token
	const tokenRef = useRef<string | undefined>(account?.user?.token);
	useEffect(() => {
		tokenRef.current = account?.user?.token;
	}, [account?.user, account?.user?.token]);

	//? Login Drawer
	const loginDrawer = {
		open: () => dispatch(setLoginDrawer(true)),
		close: () => dispatch(setLoginDrawer(false)),
		set: (v: boolean) => dispatch(setLoginDrawer(v)),
	};

	return { ...account, tokenRef, loginDrawer };
};

export const isTokenValid = (token?: string) => {
	console.log("isTokenValid")
	if (!token) token = window?.user_token || '';
	if (!token) return false;
	const exp = jwtDecode(token || '')?.exp;
	if (!exp) return false;
	return exp * 1000 > Date.now();
};

export default useAccount;
