import './index.scss';
import Chart from './Sections/Chart';
import AboutUs from './Sections/AboutUs';
import Vision from './Sections/Vision/index';
import ContactUs from './Sections/ContactUs/index';
import Instructor from './Sections/Instructor/index';
import MlModel from './Sections/MlModel/index';


const Home = () => {
	return (
		<div className='home-layout'>
			<Vision />
			<Chart />
			<MlModel />
			<Instructor />
			<AboutUs />
			<ContactUs />
		</div>
	);
};

export default Home;
