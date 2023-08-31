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
			content: `Short answer: No! \n 
				Long answer: You don’t have to be an expert in math or coding to learn machine learning. It helps if you are,
				 but our course includes easy-to-follow tutorials that will guide you step by step. \n And don’t worry, if you ever need more assistance, we’ll also provide references to extra resources for each lecture.`

		},
		{
			title: "Are there any required textbooks for the course?",
			content: 'There are no mandatory textbooks for this course as we have designed it to be as accessible as possible. We will provide a comprehensive list of online resources, including readings, research papers, and other relevant references for each topic covered in the course. These resources have been carefully selected to provide a deep understanding of the subject matter and to complement the lectures and hands-on exercises. Additionally, we will also share links to supplementary materials, such as online tutorials, blogs, and videos, which can help reinforce the concepts learned in class. However, for students who prefer to have a textbook for reference, we will recommend a few optional textbooks that cover the key concepts of applied machine learning in health.'
		},
		{
			title: "What software and tools will we be using in this course?",
			content: `We will be using Python as the programming language and commonly used libraries such as pandas, numpy, scikit-learn, and TensorFlow for data manipulation, analysis, and machine learning tasks.`
		},
		{
			title: "Will the course cover real-world healthcare applications?",
			content: `Absolutely. The course emphasizes practicality and includes case studies and projects related to real-world health applications.`
		},
		{
			title: "Can I use a different programming language instead of Python?",
			content: `Python is the primary language used in the course due to its popularity in machine learning. We recommend using Python for consistency.`
		}
		,
		{
			title: "How will the course balance theory and practical implementation?",
			content: `The course strikes a balance between theoretical understanding and hands-on implementation. Concepts will be reinforced through practical exercises.`
		},
		{
			title: "Are exams part of the course assessment?",
			content: `No, exams are not included in the course assessment. Instead, your evaluation will be based on successful completion of the course project and datathons. These elements emphasize practical application and skill development.`,

		},
		{
			title: "Is there a group activity in the course?",
			content: `Yes, we have incorporated group projects that focus on applying machine learning techniques to health-related datasets. For the datathons, teams will be formed randomly. For the course project, you have the option to complete it individually or as part of a group, based on your preference.`
		}
		,
		{
			title: "What support is available if I face difficulties with the course material?",
			content: `We provide several ways to help you succeed. You can attend our office hours for direct interaction with instructor/TAs, and you are encouraged to reach out for assistance via email or Slack. Feel free to ask questions whenever you encounter challenges or need clarification on any course content.`
		}
		]
}
export default Map;
