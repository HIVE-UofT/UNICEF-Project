import './index.scss';
import Chart from './Sections/Chart';
import AboutUs from './Sections/AboutUs';
import Vision from './Sections/Vision/index';
import ContactUs from './Sections/ContactUs/index';
import Instructor from './Sections/Instructor/index';
import MlModel from './Sections/MlModel/index';
import Map from "@src/Views/Pages/Home/Sections/Map";


const Home = () => {
	return (
		<div className='home-layout'>
			<Vision />
			<Chart />
			<MlModel />
			<Map />
			<Instructor />

			<AboutUs />
			{/*<ContactUs />*/}
		</div>
	);
};

export default Home;
