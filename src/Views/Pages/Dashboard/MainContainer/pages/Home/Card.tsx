import { classes } from '@src/Tools/Utils/React';
import { FC } from 'react';
import { Col, Row } from 'rsuite';
import './Card.scss';

type props = {
	data: {
		image: string;
		title: string;
		subtitle: string;
		data: string[];
		chart: string[];
	};
};
const Card: FC<props> = ({ data }) => {
	return (
		<div className='card'>
			<div className='image'>
				<img src={data.image} alt='' />
			</div>
			<div className='header'>
				<h3>{data.title}</h3>
				<h4>{data.subtitle}</h4>
			</div>
			<div className='content'>
				<div className='content-data'>
					<h4>Data</h4>
					<Row>
						{data.data.map((item, i) => (
							<Col {...classes('data-item-col', { ' first': i % 2 === 0 })} md={12} key={i}>
								{item}
							</Col>
						))}
					</Row>
				</div>
				<div className='content-chart'>
					<h4>Chart</h4>
					<Row>
						{data.chart.map((item, i) => (
							<Col {...classes('chart-item-col', { ' first': i % 2 === 0 })} md={12} key={i}>
								{item}
							</Col>
						))}
					</Row>
				</div>
			</div>
		</div>
	);
};

export default Card;
