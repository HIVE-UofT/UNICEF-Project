import Tutorial from '@src/Components/Lecture/Tutorial';
import { markdowns } from '@src/Data/markdowns/Lecture5/packed.markdown';

const Chart = () => {
	return (
		<div className='chart mt-4'>
			<Tutorial data={markdowns?.R} language='r' />
			<iframe src='circlepacked.html' title='html' style={{ height: '530px' }} className='w-full animate-fade-in' />
		</div>
	);
};

export default Chart;
