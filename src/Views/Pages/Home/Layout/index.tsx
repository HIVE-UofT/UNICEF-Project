import './index.scss';
import AOS from 'aos';
import { useEffect } from 'react';
import Footer from './Footer/Footer';
import NavBar from './Navbar/NavBar';
import Home from '..';

const HomeLayout = () => {
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div className='home-layout'>
			<NavBar />
			<Home />
			<Footer />
		</div>
	);
};

export default HomeLayout;
