import './NavBar.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navbar, Nav } from 'rsuite';
import Btn from '@components/BTN/BTN';
import FaIcon from '@components/FaIcon';
import { Else, If } from 'tsx-statements';
import { classes } from '@tools/Utils/React';
import useScroll from '@tools/Hooks/useScroll';
import useAccount from '@tools/Hooks/useAccount';
import useStore from '../../../../../Tools/Store/useStore';
import { logout } from '@tools/Store/actions/AccountActions';
import logo_with_text from '@assets/icons/logo-with-text.svg';
import Dashboard from '../../../Dashboard/index';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
	const scroll = useScroll();
	const { push } = useHistory();
	const { dispatch, selector } = useStore();
	const { loggedIn, loginDrawer } = useAccount();
	const [isMinimal, setMinimal] = useState(false);
	const [activeKey, setActiveKey] = useState('home');

	const activeNavKey = selector(s => s.dashboard.activeNavKey);

	// ? -------------------------------- UseEffects 👇 ------------------------------------------------------ //

	useEffect(() => {
		if (scroll < 100) isMinimal && setMinimal(false);
		else !isMinimal && setMinimal(true);
	}, [scroll]);

	useEffect(() => {
		setActiveKey(activeNavKey);
	}, [activeNavKey]);

	// ? -------------------------------- Functions 👇 ------------------------------------------------------ //

	const logoutUser = () => {
		dispatch(logout());
	};

	return (
		<div {...classes('navbar-layout', { 'navbar-layout-minimal': isMinimal })}>
			<Navbar className='navbar'>
				<Navbar.Brand className='nav-brand'>
					<img className='logo' alt='logo' src={logo_with_text} />
				</Navbar.Brand>

				<Nav className='main-nav' activeKey={activeKey} onSelect={setActiveKey}>
					<Nav.Item href='#home' className='nav-item' eventKey='home'>
						Home
					</Nav.Item>
					<Nav.Item href='#about-us' className='nav-item' eventKey='about-us'>
						About Us
					</Nav.Item>
					<Nav.Item href='#contact-us' className='nav-item' eventKey='contact-us'>
						Contact Us
					</Nav.Item>
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavBar;
