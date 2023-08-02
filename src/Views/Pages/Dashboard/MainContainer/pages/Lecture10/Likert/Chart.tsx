import { Col, Grid, Row } from 'rsuite';
import Tutorial from '@src/Components/Lecture/Tutorial';
import likert from '@assets/Images/dashboard/lecture10/likert.png';
import likert_HH from '@assets/Images/dashboard/lecture10/likert_HH.png';
import { markdowns } from '@src/Data/markdowns/Lecture10/likert.markdown';

const Chart = () => {
	const imgs = [likert_HH, likert];

	return (
		<div className='chart'>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					{[...Array(2)].map((_, i) => (
						<>
							<Row className='flex flex-col items-center mb-8'>
								<Col className='h-full' md={16}>
									<img
										src={imgs[i]}
										className='w-full animate-fade-in'
										alt=''
										onClick={async () => {
											var image = new Image();
											image.src = imgs[i];
											const w: any = window.open('');
											w?.document?.write(image?.outerHTML);
										}}
									/>
								</Col>
							</Row>
							<Row>
								<Tutorial data={i === 0 ? markdowns?.PART1 : markdowns?.PART2} language='python' />
							</Row>
							{i === 0 && <hr className='my-6' />}
						</>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
