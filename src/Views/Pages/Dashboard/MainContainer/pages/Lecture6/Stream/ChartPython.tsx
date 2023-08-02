import { If } from 'tsx-statements';
import { Col, Grid, Row } from 'rsuite';
import { useEffect, useState } from 'react';
import { CONFIG } from '@src/App/Config/constants';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { markdowns } from '@src/Data/markdowns/Lecture6/stream.markdown';

const ChartPython = () => {
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result
			const plot = await fetch(`${CONFIG.SERVER}/lecture6/stream-python`).then(res => {
				return res.text();
			});

			setImg(plot);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getResult();
	}, []);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 pt-2 pl-1 font-medium text-2xl bg-gradient-to-r flex rounded-md'>
				STREAM CHART IN PYTHON
			</h1>

			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center'>
						<Col className='my-4' md={18}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '28rem' }}
										className='w-full animate-fade-in'
									/>
								</If>
							</PanelLoader>
						</Col>
					</Row>
					<Row>
						<Tutorial data={markdowns?.PYTHON} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
