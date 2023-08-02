import { Col, Grid, Row } from 'rsuite';
import { Else, If } from 'tsx-statements';
import { useEffect, useState, useRef } from 'react';
import FaIcon from '@src/Components/FaIcon';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns } from '@src/Data/markdowns/Lecture2/bubble.markdown';
import { source_codes } from '@src/Data/markdowns/Lecture2/bubble.markdown';

const ChartPython = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const { plot_file_format, plot } = await Get({
				url: `/lecture2/bubble-python`,
			});

			setImg(atob(plot));
			setLoading(false);

			setTimeout(() => {
				const body = iframeRef?.current?.contentWindow?.document?.querySelector('body');
				if (body) {
					body.setAttribute('style', 'display: flex; justify-content: center;');
				}
				const canvas = iframeRef?.current?.contentWindow?.document?.querySelector('canvas');
				if (canvas) {
					canvas.setAttribute('style', 'width: 950px; height: 100%;');
				}
			}, 200);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getResult();
	}, []);

	return (
		<div className='chart'>
			<div className='result'>
				<h1 className='text-orange-800 py-2 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
					BUBBLE CHART IN PYTHON
				</h1>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-4 py-4'>
						<Col className='mb-8' md={20}>
							<PanelLoader className='animate-fade-in h-full' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										ref={iframeRef}
										title='html'
										style={{ height: '26rem' }}
										className='w-full ml-auto animate-fade-in'
									/>
									<Else>
										<div className='flex text-center flex-col opacity-20 w-full flex-center'>
											<FaIcon className='animate-fade-in mb-4  w-1/3' fa='t-chart-column' />
											Please select the items <br /> to show the result
										</div>
									</Else>
								</If>
							</PanelLoader>
						</Col>
						<Col className='h-full' md={24}>
							<SourceCode code={source_codes?.PYTHON || ''} language='python' />
						</Col>
					</Row>
					<Row className='details mb-8'>
						<Tutorial data={markdowns?.PYTHON} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
