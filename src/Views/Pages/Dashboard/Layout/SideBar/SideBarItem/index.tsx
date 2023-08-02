import './index.scss';
import { Panel, PanelProps } from 'rsuite';
import FaIcon from '@src/Components/FaIcon';
import { useHistory } from 'react-router-dom';
import { classes } from '@src/Tools/Utils/React';
import { openGoogleColab } from '@src/Tools/Utils/Web';
import useRole from '@src/Tools/Hooks/useRole/useRole';
import { FC, useState, useEffect, useMemo } from 'react';
import { IconNames } from '@src/Assets/fontawesome/fa.names';
import { ROLE_ITEM } from '@src/Tools/Store/reducers/AccountReducer';
import { useDashboardContext } from '../../../Utils/DashboardContext';

const SideBarItem: FC<Props> = props => {
	const { isRole } = useRole();
	const { push, location } = useHistory();
	const { state } = useDashboardContext();
	const [expanded, setExpanded] = useState(false);
	const { id, title, icon, fa, items, selected, expandable, className, roles, children, isFooter, ...rest } = props || {};

	// ? ------------------------------- functions --------------------------------

	const itemOnClick = (item: string) => {
		if (item === 'workaround in Google Colab')
			openGoogleColab('https://colab.research.google.com/drive/1JnT_KCz16JroMNyrHeNfkegIC6HMpN-b?usp=sharing');
		state.set.tmp('page.active', id);
		state.set.tmp('page.subPage', item);
		if (!['/dashboard', '/dashboard/'].includes(location?.pathname)) push('/dashboard');
	};

	const headerOnClick = () => {
		setExpanded(st => !st);
		if (!items && id) {
			state.set.tmp('page.active', id);
			state.set.tmp('page.subPage', '');
			if (!['/dashboard', '/dashboard/'].includes(location?.pathname)) push('/dashboard');
		}
	};

	useEffect(() => {
		if (!selected) {
			setExpanded(false);
		}
	}, [selected]);

	const isAccessible = useMemo(() => !roles?.length || !!isRole(...(roles || [])), [roles, isRole]);
	if (!isAccessible) return null;

	if (isFooter)
		return (
			<div className='sidebar-item-layout' onClick={headerOnClick}>
				{children}
			</div>
		);

	return (
		<Panel
			header={
				<div className='header' onClick={headerOnClick}>
					<div {...classes('flex', { 'items-center': !!fa })}>
						<div className='title'>
							{title?.split(' - ')?.map((l, i) => (
								<div key={i}>{l}</div>
							))}
						</div>
						<div className='icon'>
							{icon && <props.icon />}
							{fa && <FaIcon fa={fa} />}
							{state?.tmp?.page?.active === id && !expandable && (
								<FaIcon className='active-circle' fa='s-circle-small' />
							)}
						</div>
					</div>
					{items && (
						<FaIcon
							{...classes('arrow', { ' arrow-up': selected ? !!(expanded && expandable) : false })}
							fa='d-angle-down'
						/>
					)}
				</div>
			}
			{...classes(
				'sidebar-item-layout',
				{ 'sidebar-item-active': state?.tmp?.page?.active === id },
				className ? className : ''
			)}
			expanded={selected ? expanded && expandable : false}
			{...rest}>
			{items?.map((item, i) => (
				<div
					{...classes('item', { active: state?.tmp?.page?.subPage === item })}
					key={i}
					onClick={itemOnClick.bind(null, item)}>
					<FaIcon fa='s-circle-small' />
					<p>
						{item?.split(' - ')?.map((l, i) => (
							<div key={i}>{l}</div>
						))}
					</p>
				</div>
			))}
		</Panel>
	);
};

type Props = PanelProps<string | number> & {
	icon?: any;
	id?: string;
	fa?: IconNames;
	title?: string;
	items?: string[];
	selected?: boolean;
	roles?: ROLE_ITEM[];
	isFooter?: boolean;
	expandable?: boolean;
};

export default SideBarItem;
