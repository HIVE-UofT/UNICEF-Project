import './index.scss';
import { Col, Grid, Row } from 'rsuite';
import { our_chart } from '@src/Data/home.data';
import { Swiper, SwiperSlide } from '@src/Components/Swiper/Swiper';
import { useSwiper } from '../../../../../Components/Swiper/Swiper';
import Iframe  from 'react-iframe'
const Chart = () => {
	const { registerSwiper } = useSwiper();
	return (
		<div className='home-chart'>
			<Grid className='h-full w-full'>
				<Row className='w-full'>
						<Swiper
							// cssMode={true}
							// navigation={true}
							keyboard
							loop={true}
							autoplay={{
								delay: 2000,
								waitForTransition: true,
								pauseOnMouseEnter: true,
								disableOnInteraction: false,
								stopOnLastSlide: false,
							}}
							speed={1200}
							{...registerSwiper}
							data-aos='flip-left'
							className='chart-swiper'
							data-aos-duration='1000'>
							{our_chart.map((item, i) => {
								if (item.frameInNewRow) {
									return (
										<SwiperSlide key={i}>
											<Row className='h-full' >
												<h4>{item.section}</h4>
												<h2>{item.title}</h2>
												<p>{item.description}</p>
											</Row>

											<Row className='h-full' >
												<iframe id="serviceFrameSend"
														style={{height: '800px', width:'100%'}}	src={item.iFrameLink}
														frameBorder="0"></iframe>

											</Row>
										</SwiperSlide>
									);
								} else {
								return (
									<SwiperSlide key={i}>
										<Col className='chart-text h-full' md={10}>
											<h4>{item.section}</h4>
											<h2>{item.title}</h2>
											<p>{item.description}</p>
										</Col>

										<Col className='h-full' md={14}>
											<iframe id="serviceFrameSend"
													style={{height: '700px', width:'100%'}}	src={item.iFrameLink}
													 frameBorder="0"></iframe>

										</Col>
									</SwiperSlide>
								);}
							})}
						</Swiper>

				</Row>
			</Grid>
		</div>
	);
};

export default Chart;
