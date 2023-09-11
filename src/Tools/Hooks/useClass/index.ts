import IS from '../../Utils/IS';
import { useState } from 'react';
import useFetch from '../useFetch';
import { RequestOptions } from '../useFetch';
import { isFormDataEmpty, toJson } from '../../Utils/Object';
import { UC_Loadings_type, UC_Options, UC_getItems_Params, UC_putItem_Options } from './Types';
import {UserAuthApi} from "@tools/Store/actions/AccountActions";

const useClass = <T extends OBJECT>(CLASS_NAME: SUG<CLASS_NAMES>, options?: UC_Options) => {
	const URL = getClassUrl(CLASS_NAME);
	const PRIMARY_KEY = options?.primaryKey ?? `${CLASS_NAME}_ID`;
	const [loadings, setLoadings] = useState<UC_Loadings_type>({});
	const { Get, Post, data } = useFetch<T>(URL, { base: false });

	//* --------------------- 👇Cache --------------------------

	//?---------------------- 👇Utils -------------------------

	const _emitLoading = (name: keyof UC_Loadings_type, value: boolean) => setLoadings(s => ({ ...s, [name]: value }));

	const _extractBody = (obj?: Record<string, any>) => {
		if (!obj) return undefined;
		const formData = new FormData();

		//* Add all the blob files to the formData
		for (const [key, value] of Object.entries(obj || {}))
			if (IS.blob(value)) formData.append(key, value);
			else if (IS.object(value))
				Object.entries(value)?.forEach(([k, v]) => {
					if (IS.blob(v)) {
						formData.append(k, v);
						delete value?.[k];
					}
				});

		const hasFile = !isFormDataEmpty(formData);
		if (!hasFile) return obj;

		formData.append('body', JSON.stringify(obj));

		return formData;
	};

	//?----------------- 👇Main CRUD Methods --------------------

	const getItem = async (id: string) => {
		_emitLoading('getItem', true);
		let result;
		try {
			console.log("hre request")
			result = await Get({ url: `${URL}/${id}` });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('getItem', false);
		}
		return result as OBJECT & { item?: T };
	};

	const getItems = async (getItemsOptions: UC_getItems_Params<T> = {}) => {
		_emitLoading('getItems', true);
		const { page, limit, props, params, contains, parse_query } = getItemsOptions;
		let result;
		try {
			const queryParams = { _page: page, _limit: limit, _props: props, _contains: contains, ...params };
			if (!!parse_query) (queryParams as any)._query = JSON.stringify(parse_query.toJSON());
			result = await Get({ url: URL, params: queryParams });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('getItems', false);
		}

		return result as OBJECT & {
			items?: T[];
			count?: number;
			items_ref?: React.MutableRefObject<T[]>;
			params?: Omit<UC_getItems_Params<T>, 'params'>;
		};
	};

	const putItem = async (item: T, putItemOption: UC_putItem_Options = {}) => {
		_emitLoading('putItem', true);
		const { ID, action } = putItemOption;
		let result;
		try {
			const body = _extractBody({ action, item: { ...item, ...(!!ID ? { [PRIMARY_KEY]: ID } : {}) } });
			result = await Post({ url: URL + '/putItem', body });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('putItem', false);
		}
		return result as OBJECT & { item?: T; message?: string; action?: 'add' | 'edit' };
	};

	const addItem = async (item: T) => {
		_emitLoading('addItem', true);
		let result;
		try {
			const body = _extractBody({ action: 'add', item });
			result = await Post({ url: URL + '/putItem', body });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('addItem', false);
		}
		return result as OBJECT & { item?: T; message?: string };
	};

	const editItem = async (id: string, item: T) => {
		_emitLoading('editItem', true);
		let result;
		try {
			const body = _extractBody({ action: 'edit', item: { ...item, [PRIMARY_KEY]: id } });
			result = await Post({ url: URL + '/putItem', body });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('editItem', false);
		}
		return result as OBJECT & { item?: T; message?: string };
	};

	const deleteItem = async (id: string, body?: OBJECT<any>) => {
		_emitLoading('deleteItem', true);
		let result;
		try {
			body = { item: { [PRIMARY_KEY]: id }, ...(body || {}) };
			result = await Post({ url: URL + '/deleteItem', body });
			// if (!!LocalData) dispatch(setLocalData({ class_name: CLASS_NAME, partialUpdate: true, data: [], deleted: [id] }));
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('deleteItem', false);
		}
		return result as OBJECT & { item?: T; message?: string; action?: 'delete' };
	};

	//?------------ 👇Utility functions --------------------

	const getSchema = async () => {
		_emitLoading('getSchema', true);
		let result;
		try {
			result = await Get({ url: `${URL}/schema` });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('getSchema', false);
		}
		return result as OBJECT & {
			schema?: {
				className: string;
				fields: { [prop: string]: { type: string; required?: boolean } };
			};
		};
	};

	const getCount = async () => {
		_emitLoading('getCount', true);
		let result;
		try {
			result = await Get({ url: `${URL}/count` });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('getCount', false);
		}
		return result?.count as number;
	};

	//?----------------- 👇Endpoints -----------------------

	const { Get: EGet, Post: EPost } = useFetch<T>(URL, { base: false });

	const get = async (path: string, options?: RequestOptions) => {
		if (!path) return {} as OBJECT;
		_emitLoading('get', true);
		let result;
		try {
			result = await EGet({ url: `${URL}${path}`, ...options });
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('get', false);
		}
		return result as OBJECT;
	};

	const post = async (path: string, body?: any) => {
		_emitLoading('post', true);
		let result;
		try {
			result = await EPost(_extractBody({ url: `${URL}${path}`, body }));
		} catch (e) {
			throw e;
		} finally {
			_emitLoading('post', false);
		}
		return result as OBJECT;
	};

	//?------------------------------------------------------

	const Class = {
		get,
		post,

		getItem,
		getItems,
		putItem,
		addItem,
		editItem,
		deleteItem,

		loadings,
		getCount,
		getSchema,

		/* 		
		items: useMemo<T[] | undefined>(() => Object.values(LocalData || {}), [LocalData]),

		item: useCallback(
			(ID?: string) => {
				if (!ID) return;
				return LocalData?.[ID];
			},
			[LocalData]
		), 
		*/
	};

	return { Class, data, classLoadings: loadings, PRIMARY_KEY };
};


export const APIAddr = `https://ml.hivelab-uoft.ca/api`
// export const APIAddr = `http://localhost:9090/api`
export const getClassUrl = (className: string) => `${APIAddr}/${className}`;

export default useClass;
