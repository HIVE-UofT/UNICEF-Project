import './TableRenderer.scss';
import FaIcon from '../FaIcon';
import useInputs from 'use-inputs';
import { If } from 'tsx-statements';
import PanelLoader from '../PanelLoader';
import { classNames } from '../../Tools/Utils/React';
import { isContain } from '../../Tools/Utils/String';
import { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { useTable, useSortBy, CellProps, useExpanded, usePagination, DefaultSortTypes } from 'react-table';

const TableRenderer: FC<TableRendererProps> = props => {
	const useInputsObject = useInputs();
	const tableRef = useRef<HTMLDivElement>(null);
	const { Inputs, getDirtyInputsData } = useInputsObject;

	// properties
	const { hasHeaderBtns = false, onInit } = props;
	const { loading, cols = [], data = [], onDataChange, defaultSortKey, share } = props;
	const { counterColumn = false, startColColor = 'dark', defaultSortType = 'dsc' } = props;
	const { pageSize: pageSizeProp, pageIndex: pageIndexProp, noDataText, searchHeader } = props;

	const memoData = useMemo(() => {
		let filteredData = data;
		const input_data = getDirtyInputsData();
		const entries = Object.entries(input_data);
		entries.forEach(([key, value]: any) => {
			if (!value) return;
			filteredData = filteredData.filter((item: any) => {
				return isContain(item?.[key], value);
			});
		});
		return filteredData;
	}, [data, Inputs]);

	const memoCol = useMemo(
		() => [
			...(counterColumn
				? [
						{
							Header: '#',
							maxWidth: 50,
							accessor: 'counter-column',
							Cell: ({ row }: any) => <div className='opacity-90'>{+row?.index + 1}</div>,
						},
				  ]
				: []),
			...cols.map(c => ({
				...c,
				Header: c.Header || c.label,
				accessor: c.accessor || c.key,
			})),
		],
		[cols]
	);

	const tableOptions = {
		manual: true,
		autoResetSortBy: false,
		data: (memoData as any) || [],
		columns: (memoCol as any) || [],
		initialState: {
			share,
			pageIndex: pageIndexProp,
			pageSize: pageSizeProp,
			...(defaultSortKey ? { sortBy: [{ id: defaultSortKey, desc: defaultSortType !== 'dsc' }] } : {}),
		},
	} as any;

	const plugins: any[] = useMemo(() => {
		const hasSort = memoCol?.some(c => !!c?.sortable);
		return [...(hasSort ? [useSortBy] : []), useExpanded, usePagination];
	}, [memoCol]);

	const tableConfig = useTable(tableOptions, ...plugins);
	const { headerGroups, rows } = tableConfig;

	const { page, gotoPage, setPageSize } = tableConfig as any;

	const { getTableProps, getTableBodyProps, prepareRow } = tableConfig;

	const isPagination = pageIndexProp !== undefined && pageSizeProp !== undefined;

	//?------------------- useEffects --------------------------------------------//

	useEffect(() => {
		if (!onInit) return;
		onInit(useInputsObject);
	}, []);

	useEffect(() => {
		onDataChange?.(data);
	}, [data]);

	useEffect(() => {
		setTimeout(() => {
			if (pageSizeProp !== undefined) setPageSize(pageSizeProp);
			if (pageIndexProp !== undefined) gotoPage(pageIndexProp);
		}, 0);
	}, [pageSizeProp, pageIndexProp]);

	useEffect(() => {
		if (data?.length > (pageIndexProp || 0) * (pageSizeProp || 0)) return;
		const i = ~~(data?.length / (pageSizeProp || 1));
		gotoPage(i);
		(props as any)?.set?.page(i);
	}, [data]);

	//?--------------------------------------------------------------------------//

	const sortBox = (column: any) => {
		let sortIcon = <FaIcon fa='s-sort' />;
		if (column?.isSorted) {
			if (column?.isSortedDesc) sortIcon = <FaIcon fa='d-arrow-up-short-wide' />;
			else sortIcon = <FaIcon fa='d-arrow-down-wide-short' />;
		}
		return <div className='th-sort-icon'>{sortIcon}</div>;
	};

	return (
		<div className='react-table-layout'>
			<div
				ref={tableRef}
				className={classNames('react-table', `react-table-start-col-${startColColor}`, {
					'has-header-btns': hasHeaderBtns,
					'has-inputs-search': !!searchHeader,
				})}>
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup, i) => {
							const headerLength = headerGroup.headers?.length - 1;

							return (
								<tr {...headerGroup.getHeaderGroupProps()} key={i}>
									{headerGroup.headers.map((column: any, j) => {
										const { minWidth, maxWidth, flexGrow, width, key } = column;
										return (
											<div
												key={key}
												style={{
													flexGrow,
													width: width + 'px',
													minWidth: minWidth + 'px',
													maxWidth: maxWidth + 'px',
												}}>
												<th
													key={j}
													{...column.getHeaderProps(
														column?.sortable ? column?.getSortByToggleProps?.() : undefined
													)}
													className={classNames({
														'th-sorted': column?.isSorted,
														'th-sortable': column?.sortable,
														last: j === headerLength,
														'one-left-to-last': j === headerLength - 1,
														'two-left-to-last': j === headerLength - 2,
													})}>
													{column.render('Header')}
													{column?.sortable && sortBox(column)}
												</th>
											</div>
										);
									})}
								</tr>
							);
						})}
					</thead>

					<PanelLoader loading={loading}>
						<tbody {...getTableBodyProps()}>
							{(isPagination ? page : rows).map((row: any, i: any) => {
								prepareRow(row);
								return (
									<tr key={i} {...row?.getRowProps()} className={classNames({ 'tr-child': row?.depth !== 0 })}>
										{row?.cells?.map((cell: any, j: any) => {
											const { width, prefix, postfix, maxWidth, minWidth, flexGrow } = cell?.column;

											return (
												<td
													key={j}
													{...cell?.getCellProps()}
													style={{
														flexGrow,
														width: width + 'px',
														minWidth: minWidth + 'px',
														maxWidth: maxWidth + 'px',
													}}>
													{prefix}
													{cell?.render('Cell', { share })}
													{postfix}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</PanelLoader>
				</table>
				<If condition={!loading && (memoData?.length === 0 || !data)}>
					<div className='table-no-record'>{noDataText ?? 'No Records Found'}</div>
				</If>
			</div>
		</div>
	);
};

export type RowDataType = {
	[key: string]: any;
	subRows?: RowDataType[];
};

export type ColDataType = {
	id?: string;
	Header?: any;
	prefix?: any;
	postfix?: any;
	width?: number;
	accessor?: string;
	flexGrow?: number;
	minWidth?: number;
	maxWidth?: number;
	sortable?: boolean;
	key?: any; // deprecated , use accessor
	label?: any; // deprecated , use Header
	filterType?: 'Date' | 'Time' | 'Date-Time' | 'Price';
	sortType?: DefaultSortTypes | ((a: any, b: any) => number);
	Cell?: (props: CellProps<any> & { share: any }) => ReactNode;
};

export type TableRendererProps = {
	share?: any;
	onInit?: any;
	data: object[];
	loading?: boolean;
	pageSize?: number;
	pageIndex?: number;
	cols: ColDataType[];
	noDataText?: string;
	searchHeader?: boolean;
	displayAngles?: boolean;
	hasHeaderBtns?: boolean;
	defaultSortKey?: string;
	counterColumn?: boolean;
	defaultSortType?: 'dsc' | 'asc';
	startColColor?: 'dark' | 'light';
	onDataChange?: (data: any) => void;
};

export default TableRenderer;
