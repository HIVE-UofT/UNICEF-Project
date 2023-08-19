import './index.scss';

import { Col, Grid, Row } from 'rsuite';

import Faq from 'react-faq-component';
import {useEffect, useRef} from "react";
import {useInView} from "@tools/Hooks/useIntersectionObserver";
import useStore from "@tools/Store/useStore";
import {setActiveNavKey} from "@tools/Store/actions/DashboardActions";
const Map = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { isVisible } = useInView(ref);
	const { dispatch } = useStore();
	useEffect(() => {
		if (isVisible) {
			dispatch(setActiveNavKey('faq'));
		} else dispatch(setActiveNavKey(''));
	}, [isVisible]);
	return (
		<div className='faq-layout' id='faq' ref={ref}>
			<Grid>

				<Row style={{paddingLeft: '5%', display: 'flex', alignItems: 'center' }} className=''>
					<Col md={24} >
						<Faq   styles={styles} data={data}/>

					</Col>
				</Row>
			</Grid>
		</div>
	);
};


const styles = {
	bgColor: 'none',
	titleTextColor: '#CCA000',
	rowTitleColor: "#4F518C",

};

const data = {
	title: "Frequently Asked Questions!",
	rows: [
		{
			title: "Is a strong math and coding background necessary for understanding this course?",
			content: 'Short answer: No! \n '  +
				"Long answer: You don’t have to be an expert in math or coding to learn machine learning. It helps if you are," +
				' but our course includes easy-to-follow tutorials that will guide you step by step. \n And don’t worry, if you ever need more assistance, we’ll also provide references to extra resources for each lecture.'

		},
		{
			title: "Nunc maximus, magna at ultricies elementum",
			content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam."
		},
		{
			title: "Curabitur laoreet, mauris vel blandit fringilla",
			content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc"
		},
		{
			title: "What is the package version",
			content: "v1.0.5"
		}]
}
export default Map;
