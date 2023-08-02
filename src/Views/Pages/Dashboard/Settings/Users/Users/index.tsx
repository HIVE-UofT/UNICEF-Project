import './index.scss';
import { Container } from 'rsuite';
import useInputs from 'use-inputs';
import FaIcon from '@components/FaIcon';
import { useHistory } from 'react-router';
import Box from '@src/Components/Box/Box';
import Btn from '@src/Components/BTN/BTN';
import { useEffect, useMemo } from 'react';
import Footer from '../../../Layout/Footer';
import useClass from '@src/Tools/Hooks/useClass';
import useWindow from '@src/Tools/Hooks/useWindow';
import { useAdvancedState } from 'ahq-front-tools';
import usePagination from '@src/Tools/Hooks/usePagination';
import { Notify, classNames } from '@src/Tools/Utils/React';
import Pagination from '@src/Components/Pagination/Pagination';
import { isContain, uppercaseWords } from '@src/Tools/Utils/String';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import TableRenderer, { ColDataType } from '@src/Components/TableRenderer/TableRenderer';

const Users = () => {
	const { size } = useWindow();
	const { width } = size || {};
	const limit = width < 1550 ? 4 : 6;
	const { push, location } = useHistory();
	const { valueOf, register } = useInputs();
	const { Class: USERS } = useClass('VIZ_SYSTEM_USER');
	const state = useAdvancedState({ items: [] as any[] });
	const { registerTable, registerPagination, setPageSize } = usePagination({ withParams: true, initialPageSize: limit });

	// ? ------------------- Functions 👇 ------------------- //

	const getUsers = async () => {
		try {
			const { items } = (await USERS?.getItems()) || {};
			state.set.tmp('items', Object?.values(items || {}));
		} catch (e: any) {
			Notify.error(e?.message || '');
		}
	};

	// ? ------------------- UseEffects 👇 ------------------- //

	useEffect(() => {
		setPageSize(limit);
	}, [limit]);

	useEffect(() => {
		getUsers();
	}, []);

	// ? ------------------- Components 👇 ------------------- //

	const header = (
		<>
			<FaIcon fa='l-users' />
			<p>Users</p>
		</>
	);

	// ? ----------------------- Filter data 👇 --------------------- //

	const filters = ['name', 'email', 'username'];
	const filteredData = useMemo(
		() => (state.tmp.items || [])?.filter((d: any) => filters?.some(f => isContain(d[f], valueOf('search')))),
		[state.tmp.items, valueOf('search')]
	);

	const rightSideHeader = (
		<div className='right-header-search'>
			<EditableInput
				placeholder='Search'
				{...register('search')}
				innerComponentPosition='left'
				innerComponent={<FaIcon fa='l-magnifying-glass' />}
			/>
			<Btn fa='r-plus' onClick={() => push(`${location.pathname}/new`)} children='New User' />
		</div>
	);

	return (
		<Container className='users-layout'>
			<Box {...{ header, rightSideHeader }} className='panel' headerSeparator={width < 1550 ? false : true}>
				<TableRenderer {...{ cols }} {...registerTable} data={filteredData} loading={USERS?.loadings?.getItems} />
				<Pagination {...registerPagination} />
			</Box>
			<Footer />
		</Container>
	);
};

//Define columns type of table
const cols: ColDataType[] = [
	{
		width: 120,
		label: 'Action',
		key: 'VIZ_SYSTEM_USER_ID',
		Cell: ({ row: { original } }: any) => {
			const { push, location } = useHistory();
			return (
				<FaIcon
					fa='s-user-pen'
					className='action-btn'
					onClick={() => push(`${location.pathname}/${original?.VIZ_SYSTEM_USER_ID}`)}
				/>
			);
		},
	},
	{
		key: 'name',
		label: 'Name',
		flexGrow: 1,
		minWidth: 200,
	},
	{
		key: 'email',
		label: 'Email',
		flexGrow: 1,
		minWidth: 280,
	},
	{
		flexGrow: 1,
		minWidth: 200,
		key: 'username',
		label: 'Username',
	},
	{
		flexGrow: 1,
		maxWidth: 120,
		key: 'status',
		label: 'Status',
		Cell: ({ row: { original } }: any) => {
			const { status } = original || {};

			return (
				<div className={classNames({ 'active-status': 'ACTIVE' === status, 'disable-status': 'DISABLED' === status })}>
					{uppercaseWords(status)}
				</div>
			);
		},
	},
	// {
	// 	flexGrow: 1,
	// 	Header: 'Role',
	// 	accessor: 'role.item.isSuper',
	// },
];

export default Users;
