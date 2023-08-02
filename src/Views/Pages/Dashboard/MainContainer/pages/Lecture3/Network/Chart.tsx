import './index.scss';
import { useState, useEffect } from 'react';
import Btn from '@src/Components/BTN/BTN';
import { Else, If } from 'tsx-statements';
import ReactMarkdown from 'react-markdown';
import FaIcon from '@src/Components/FaIcon';
import { Col, Grid, Row, Slider } from 'rsuite';
import PanelLoader from '@src/Components/PanelLoader';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdown } from '@src/Data/markdowns/Lecture3/network.markdown';

const Chart = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [showResult, setShowResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState(30);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			const { plot_file_format, config, plot } = await Get({ url: `/lecture3/network-r-chart?min_freq=${value}` });

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
			<h3 className='pt-4 text-sm mb-3'>Minimum Frequency</h3>
			<div className='relative pl-1'>
				<div className='relative w-1/3'>
					<Slider
						min={30}
						max={100}
						progress
						defaultValue={value}
						onChange={value => setValue(value)}
						className='z-10'
					/>
					<label className='absolute top-3.5 -left-2'>30</label>
					<label className='absolute top-3.5 -right-2'>100</label>
				</div>
				<div className='absolute w-full -mt-4 flex-center'>
					<Btn className='' onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>

			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center my-8'>
						<Col className='' md={12}>
							<PanelLoader className='animate-fade-in' loading={loading}>
								<If condition={showResult}>
									<img
										alt='plot'
										src={`data:image/svg+xml;base64,${img}`}
										className='cursor-pointer transition-all transform  w-full mx-auto animate-fade-in  -mr-5'
										onClick={async () => {
											var image = new Image();
											image.src = `data:image/svg+xml;base64,${img}`;
											const w: any = window.open('');
											w?.document?.write(image?.outerHTML);
										}}
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
						{/* <Col className='h-full' md={24}>
							<SourceCode code={source_codes?.R || ''} language='r' />
						</Col> */}
					</Row>
					<ReactMarkdown children={markdown} />
					<Row>
						<div className='l3-tutorial'>
							<iframe className='iframe' src='l3-tutorial.html' title='tutorial' />
						</div>
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
