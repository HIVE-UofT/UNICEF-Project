import './index.scss';
import {instructor, our_chart} from '@src/Data/home.data';
import separator from '@assets/Images/home/partner-separator.svg';
import { Col, Grid, Row } from 'rsuite';
import UNICEF from '@assets/Images/home/UNICEF.png';
import DSI from '@assets/Images/home/DSI.png';
import {SwiperSlide} from "@components/Swiper/Swiper";
const Instructor = () => {
	return (
		<div className='instructor-layout'>
			<Grid>
				<Row className='flex items-end'>
					<Col className='flex items-start' md={14}>
						{instructor.people.map((item, i) => {
								return (
									<Col className='items-start' >
										<div className='instructor-image'>
											<img src={item.image} alt='instructor' />
										</div>
										<div className='instructor-info'>

											<h3>{item.name}</h3>
											<p>{item.description}</p>
										</div>
									</Col>
								);

						})}

					</Col>
					<Col md={10}>
						<Col className='logos' >
							<img className='mr-4' src={instructor.logos[0]} alt='' />
							<img src={separator} />
							<img className='ml-4' src={instructor.logos[1]} alt='' />
						</Col>
						<Col className='logos' >
							<img className='mr-4' src={UNICEF} alt='' />
							<img src={separator} />
							<img className='ml-4' src={DSI} alt='' />
						</Col>
					</Col>

				</Row>
			</Grid>
		</div>
	);
};

export default Instructor;
