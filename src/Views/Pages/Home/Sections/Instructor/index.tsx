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

				<Row style={{paddingLeft: '5%'}} className=''>
					<h2 className='mb-1' >{instructor.title}</h2>
					<Col style={{marginLeft: '2vw'}} className='flex items-start' md={17}>

						{instructor.people.map((item, i) => {
								return (
									<Col  md={9}>
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
					<Col md={6}>
						<Col className='logos' >
							<img className='mr-3' src={instructor.logos[0]} alt='' />
							<img src={separator} />
							<img className='ml-3' src={instructor.logos[1]} alt='' />
						</Col>
						<Col className='logos' >
							<img className='mr-3' src={UNICEF} alt='' />
							<img src={separator} />
							<img className='ml-3' src={DSI} alt='' />
						</Col>
					</Col>

				</Row>
			</Grid>
		</div>
	);
};

export default Instructor;
