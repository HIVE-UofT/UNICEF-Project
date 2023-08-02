import { Col, Grid, Row } from 'rsuite';
import FaIcon from '@src/Components/FaIcon';
import SourceCode from '@src/Components/Lecture/SourceCode';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture5/treemap.markdown';

const ChartR = () => {
	return (
		<div className='chart mt-4'>
			<h1 className='text-orange-800 pt-2 pl-1 font-medium text-2xl bg-gradient-to-r flex rounded-md'>
				TREEMAP CHART IN R
			</h1>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-8'>
						<Col md={20}>
							<iframe
								src='interactive_treemap.html'
								title='html'
								style={{ height: '37.5rem' }}
								className='w-full animate-fade-in'
							/>
						</Col>
						<Col className='h-full' md={24}>
							<SourceCode code={source_codes?.R} language={'python'} />
						</Col>
					</Row>
					<Row>
						<Tutorial data={markdowns?.R} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartR;
