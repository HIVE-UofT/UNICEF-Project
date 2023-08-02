import { useState, useCallback } from 'react';
import { useMemo, useEffect, SetStateAction } from 'react';
import { deepClone, isEqualObjects } from '../../Utils/Object';

type OU_Path = string | string[];

type StateDispatch<T = any> = SetStateAction<T>;

const useAdvancedState = <T extends OBJECT = OBJECT<any>>(in_state: T, dependencies: any[] = []) => {
	const [org, setOrgData] = useState<T>(deepClone(in_state));
	const [tmp, setTmpData] = useState<T>(deepClone(in_state));

	//? ------------------------------ useEffect ------------------------------------------------

	useEffect(() => {
		const cloned = deepClone(in_state);
		if (isEqualObjects(cloned, org)) return;
		setTmpData(cloned);
		setOrgData(cloned);
	}, dependencies);

	useEffect(() => {
		if (isEqualObjects(tmp, org)) return;
		setTmpData(deepClone(org));
	}, [org]);

	//? ---------------------------------- utils ------------------------------------------------

	function setOrg(state: StateDispatch<T>): void;
	function setOrg(key: OU_Path, value: StateDispatch<any>): void;
	function setOrg(p1?: unknown, p2?: StateDispatch<any>) {
		if (arguments.length === 1) return setOrgData(p1 as any);
		console.log(arguments.length);
		// if (arguments.length === 2) return setOrgData(s => new OBJ(s).inner(p1 as string).set(p2));
	}

	function setTmp(state: StateDispatch<T>): void;
	function setTmp(key: OU_Path, value: StateDispatch<any>): void;
	function setTmp(p1?: unknown, p2?: StateDispatch<any>) {
		if (arguments.length === 1) return setTmpData(p1 as any);
		// if (arguments.length === 2) return setTmpData(s => new OBJ(s).inner(p1 as string).set(p2));
	}

	// -----------------------------------------------------------------------------------------

	return {
		tmp,
		org,
		set: { org: setOrg, tmp: setTmp },
		changed: useMemo(() => !isEqualObjects(org, tmp), [org, tmp]),
		discard: useCallback(() => setTmpData(org), [in_state, org]),
	};
};

export default useAdvancedState;
