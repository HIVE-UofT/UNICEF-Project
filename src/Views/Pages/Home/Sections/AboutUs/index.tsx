import './index.scss';
import { Col, Grid, Row } from 'rsuite';
import Btn from '@src/Components/BTN/BTN';
import { useRef, useEffect } from 'react';
// import { about_us } from '@src/Data/home.data';
import useStore from '@src/Tools/Store/useStore';
import { useInView } from '@src/Tools/Hooks/useIntersectionObserver';
import { setActiveNavKey } from '@src/Tools/Store/actions/DashboardActions';
import about_img from '@assets/Images/home/homepage-aboutus-right.png';

const AboutUs = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { isVisible } = useInView(ref);
	const { dispatch } = useStore();

	useEffect(() => {
		if (isVisible) {
			dispatch(setActiveNavKey('about-us'));
		} else dispatch(setActiveNavKey(''));
	}, [isVisible]);

	return (
		<div className='about-us-layout' id='about-us' ref={ref}>
			<Grid className='h-full'>
				<Row className='h-full'>
					<Col className='text h-full' data-aos='fade-right' data-aos-delay='200' data-aos-duration='800' md={14}>
						<div className='header'>
							<h4>{about_us.text.section}</h4>
							<h2>{about_us.text.title}</h2>
							<p>{about_us.text.description}</p>
						</div>
						<div className='apply-btn'>
							<Btn href='https://hivelab-uoft.ca/' target={'_blank'}>
								Visit HIVE Lab
							</Btn>
						</div>
					</Col>
					<Col className='h-full' data-aos='fade-left' data-aos-delay='200' data-aos-duration='800' md={10}>
						<img src={about_img} alt='' />
					</Col>
				</Row>
			</Grid>
		</div>
	);
};

export default AboutUs;

export const about_us = {
	text: {
		section: 'About Us',
		title: 'HIVE Lab',
		description: (
			<p>
				The Health Informatics, Visualization, and Equity (HIVE) Lab in the{' '}
				<a className='underline' href='https://ihpme.utoronto.ca/' target={'_blank'} rel='noreferrer'>
					Institute of Health Policy, Management and Evaluation
				</a>
				,{' '}
				<a className='underline' href='https://www.dlsph.utoronto.ca/' target={'_blank'} rel='noreferrer'>
					Dalla Lana School of Public Health
				</a>{' '}
				at the University of Toronto is a group of data scientists, epidemiologists, and software developers working at
				the interface of Machine Learning, AI, Information Visualization, and Health Informatics.
			</p>
		),
	},
};
