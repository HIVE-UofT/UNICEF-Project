import './SplashScreen.scss';
import logo from '@assets/icons/brand/DANDELION-white-logo.svg';

const SplashScreen = () => {
	return (
		<div className='splash-screen-layout'>
			<div className='center-box'>
				<img className='logo' alt='logo' src={logo} />
			</div>
		</div>
	);
};

export default SplashScreen;
