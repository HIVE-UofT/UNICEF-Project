import './Footer.scss';
import moment from 'moment';
import { Col, Grid, Row } from 'rsuite';
import { footer } from '@src/Data/home.data';
import Dalla from '@assets/Images/home/p4.svg';
import Toronto from '@assets/Images/home/p3.svg';

import { ReactComponent as Separator } from '@assets/Images/home/partner-separator.svg';

const year = moment().format('YYYY');

const Footer = () => {
	return (
		<div className='footer-layout'>
			<Grid className='footer-grid'>
				<Row>
					<Col xs={24} md={8}>
						<h3>HIVE Lab</h3>
						<p>{footer.description}</p>
						<div className='logos'>
							<img src={Toronto} alt='' />
							<Separator className='separator' />
							<img src={Dalla} alt='' />


						</div>
					</Col>


					<Col className='pt-6' xs={24} md={8}>
						<Col md={6}>
							<a href='#home'>Home</a>
							<a href='#about-us'>About Us</a>
							<a href='#contact-us'>Contact Us</a>
						</Col>
						<Col md={18}>
							<a target="_blank" href="https://viz-hivelab.com">Visualization Course</a>
							<a target="_blank" href="https://ihpme.utoronto.ca/">IHPME</a>
							<a target="_blank" href="https://www.dlsph.utoronto.ca/">DLSPH</a>
						</Col>
					</Col>

				</Row>
			</Grid>
			<div className='footer'>
				<p>Copyright © {year} HIVE Lab @UofT. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
