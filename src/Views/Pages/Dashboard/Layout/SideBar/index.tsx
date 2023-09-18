import './index.scss';
import SideBarItem from './SideBarItem';
import Btn from '@src/Components/BTN/BTN';
import FaIcon from '@src/Components/FaIcon';
import useStore from '@src/Tools/Store/useStore';
import { useState, useRef, useEffect } from 'react';
import useAccount from '@src/Tools/Hooks/useAccount';
import { sidebar_menu } from '@src/Data/dashboard.data';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '@src/Tools/Store/actions/AccountActions';
import { useDashboardContext } from '../../Utils/DashboardContext';
import MenuDropdown from '@src/Components/MenuDropdown/MenuDropdown';
import Role from '@src/Components/Role/Role';
import { If } from 'tsx-statements';

const SideBar = () => {
	const { user } = useAccount();
	const { dispatch } = useStore();
	const { pathname } = useLocation();
	const { push, replace } = useHistory();
	const { state } = useDashboardContext();
	const menuRef = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState('0');

	// ? -------------------------------- Utils --------------------------------

	const toggle = () => state.set.tmp('sidebar.open', (s: boolean) => !s);

	const logOut = () => dispatch(logout());

	useEffect(() => {
		if (!['/dashboard', '/dashboard/'].includes(pathname)) {
			state?.set?.tmp('page.active', '');
			state?.set?.tmp('page.subPage', '');
		}
	}, [pathname]);

	// -------------------------------------------------------------------------

	return (
		<div className='dashboard-sidebar-layout'>
			<div className='sidebar-header'>
				<div className='logo-container'>
					<div className='logo' />
				</div>
			</div>
			<div ref={menuRef} className='sidebar-menu'>
				{sidebar_menu.map((item, i) => {
					return (
						<SideBarItem
							key={i}
							collapsible
							eventKey={i}
							id={item.key}
							icon={item?.icon}
							title={item?.title}
							items={item?.items}
							defaultExpanded={false}
							roles={item?.roles as any}
							expandable={state.tmp.sidebar.open}
							selected={selected === i.toString()}
							onSelect={(eventKey, _) => {
								if (item?.items) state.set.tmp('sidebar.open', true);
								setSelected(eventKey.toString());

								if (sidebar_menu.length - i < 3)
									setTimeout(() => {
										menuRef.current?.scrollTo({ top: menuRef.current?.scrollHeight, behavior: 'smooth' });
									}, 200);
							}}
						/>
					);
				})}
			</div>
			<div className='sidebar-footer'>
				{/* --------------------------------------- hot fix -----------------------------------------*/}
				<>
					<SideBarItem isFooter>
						<MenuDropdown
							title='Teams'
							mainMenu={
								<Btn
									fa='l-users-medical'
									className='border-none'
									appearance='ghost'
									title='Teams'

									children={
										<div className='header'>
											<div className='title'>Teams</div>
										</div>
									}
								/>
							}
							submenus={[
								{
									action: () => push('/dashboard/settings/teams'),
									icon: 'l-users-medical',
									title: 'Teams',
								},
							]}
						/>
					</SideBarItem>
					{/*<If condition={!!user?.role?.isSuper}>*/}
					{/*	<SideBarItem isFooter>*/}
					{/*		<MenuDropdown*/}
					{/*			title='Settings'*/}
					{/*			mainMenu={*/}
					{/*				<Btn*/}
					{/*					fa='l-gear'*/}
					{/*					className='border-none'*/}
					{/*					appearance='ghost'*/}
					{/*					title='Settings'*/}
					{/*					children={*/}
					{/*						<div className='header'>*/}
					{/*							<div className='title'>Settings</div>*/}
					{/*						</div>*/}
					{/*					}*/}
					{/*				/>*/}
					{/*			}*/}
					{/*			submenus={[*/}
					{/*				{*/}
					{/*					action: () => push('/dashboard/settings/users'),*/}
					{/*					icon: 'l-users',*/}
					{/*					title: 'Users',*/}
					{/*				},*/}
					{/*			]}*/}
					{/*		/>*/}
					{/*	</SideBarItem>*/}
					{/*</If>*/}
					<SideBarItem isFooter>
						<MenuDropdown
							title='Profile'
							mainMenu={
								<Btn
									fa='l-user'
									className='border-none'
									appearance='ghost'
									title='Profile'
									children={
										<div className='header'>
											<div className='title'>Profile</div>
										</div>
									}
								/>
							}
							submenus={[
								{
									action: () => replace(`/dashboard/settings/users/${user?.ID}`),
									icon: 'l-address-card',
									title: 'Go to profile',
									iconClass: 'go-to-prof',
								},
								{
									action: logOut,
									icon: 'l-arrow-right-from-bracket',
									title: 'Log out',
									iconClass: 'log-out',
								},
							]}
						/>
					</SideBarItem>
				</>

				{/* ------------------------------------------------------------------------------------------- */}
				<div onClick={toggle} className='sidebar-toggle-btn'>
					<FaIcon fa='l-angle-right' />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
