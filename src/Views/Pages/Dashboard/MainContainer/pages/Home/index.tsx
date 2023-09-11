import { home_data } from '@src/Data/dashboard.data';
import { Col, Grid, Row } from 'rsuite';
import Card from './Card';

import FaIcon from "@components/FaIcon";

// const Home = () => {
// 	return (
// 		<div className='dashboard-home'>
// 			<div className='header'>
// 				<h2>{home_data.header.title}</h2>
// 				<p>{home_data.header.description}</p>
// 			</div>
// 			<div className='content'>
// 				<div className='content-header'>
// 					<h3>{home_data.content.title}</h3>
// 					<p>{home_data.content.description}</p>
// 				</div>
// 				<Grid className='h-full'>
// 					<Row className='row flex'>
// 						{home_data.content.cards.map(card => {
// 							return (
// 								<Col className='h-ful' md={5}>
// 									<Card data={card} />
// 								</Col>
// 							);
// 						})}
// 					</Row>
// 				</Grid>
// 			</div>
// 		</div>
// 	);
// };

const Home = () => {
	return (

			<iframe id="serviceFrameSend"
					style={{height: '100%',width:'100%',zIndex:'999'}}	src='HomePage.html'
					frameBorder="0">
			</iframe>


	);
};

export default Home;
