import './index.scss';
import { useEffect, useRef } from 'react';
import { our_vision } from '@src/Data/home.data';
import useStore from '@src/Tools/Store/useStore';
import { useInView } from '@src/Tools/Hooks/useIntersectionObserver';
import { setActiveNavKey } from '@src/Tools/Store/actions/DashboardActions';
import { Col, Grid, Row } from 'rsuite';
// import vision_img from '@assets/Images/home/vision-image.png';
import vision_img from '@assets/Images/home/homepage-header-right.png';


const Vision = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { isVisible } = useInView(ref);
	const { dispatch } = useStore();

	useEffect(() => {
		if (isVisible) {
			dispatch(setActiveNavKey('home'));
		} else dispatch(setActiveNavKey(''));
	}, [isVisible]);

	return (
		<div className='vision' id='home' ref={ref}>
			<div className='vision-content'>
				<Grid className='w-full'>
					<Row className='flex items-center w-full'>
						<Col md={11}>
							<div data-aos='fade-up' data-aos-duration='1000'>
								<h4>{our_vision.section}</h4>
								<h1>{our_vision.title}</h1>
								<h2>{our_vision.sub_title}</h2>
								<p>{our_vision.description}</p>
							</div>
						</Col>
						<Col className='m-auto lg-auto' md={11} lg={8} data-aos='zoom-in' data-aos-duration='1000'>
							<img  src={vision_img} alt='' />
						</Col>
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default Vision;
