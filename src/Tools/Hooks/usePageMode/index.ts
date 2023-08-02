import useHash from '../useHash';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const usePageMode = () => {
	const { id }: any = useParams();
	const { hashes, hasHash, modifyHash } = useHash();

	//? --------------------- 👇 useState ----------------------------

	const [add, setAdd] = useState<boolean>(id === 'new' || id === 'add' || hasHash('add'));
	const [edit, setEdit] = useState<boolean>(add || hasHash('edit'));
	const [view, setView] = useState<boolean>(!add && !edit);

	//? ---------------------- 👇Utilities ----------------------------

	const removeHashes = () => {
		modifyHash([], ['add', 'edit', 'view']);
	};

	const setHashOnly = (hash: 'edit' | 'add') => {
		modifyHash([hash], [hash === 'edit' ? 'add' : 'edit', 'view']);
	};

	//? ------------------------- 👇Mode ------------------------------

	const mode = {
		is: { add, edit, view },
		set: {
			add: (is?: boolean) => {
				if (is) {
					setAdd(true);
					setEdit(true);
					setView(false);
					setHashOnly('add');
				} else {
					setAdd(false);
					setView(!edit);
					removeHashes();
				}
			},
			edit: (is?: boolean) => {
				if (is) {
					setEdit(true);
					setAdd(false);
					setView(false);
					setHashOnly('edit');
				} else {
					setEdit(false);
					setAdd(false);
					setView(true);
					removeHashes();
				}
			},
			view: (is?: boolean) => {
				if (is) {
					setView(true);
					setAdd(false);
					setEdit(false);
					removeHashes();
				} else {
					setView(false);
					setEdit(true);
					// setAdd(false);
					removeHashes();
				}
			},
		},
	};

	//? --------------------- 👇useEffects ----------------------------

	useEffect(() => {
		if (hasHash('view') && !mode.is.view) return mode.set.view(true);
	}, [hashes]);

	//------------------------------------------------------------------

	return { mode };
};

export default usePageMode;
