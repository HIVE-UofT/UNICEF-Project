import { Col, Grid, Row } from 'rsuite';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture2/bar.markdown';
import Selector from '../../../../../../../Components/Selector/Selector';

const ChartR = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [province, setProvince] = useState('Canada');
	const [loading, setLoading] = useState(false);
	const { temp, set } = useData({ provinces: [] });
	const [showResult, setShowResult] = useState(false);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const { plot_file_format, config, plot } = await Get({
				url: `/bar/r-chart?province=${province}`,
			});

			setImg(plot);

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { province } = await Get({ url: `/bar/r-selections` });

				set.temp({ provinces: province });
			} catch (e) {
				console.log(e);
			}
		};

		getInputs();
	}, []);

	useEffect(() => {
		if (province) {
			getResult();
		}
	}, [province]);

	return (
		<div className='chart mt-4'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				BAR CHART IN R
			</h1>
			<div className='inputs flex items-center justify-between mb-2'>
				<Selector
					value={province}
					placeholder={province}
					cleanable={false}
					label='Select the Province'
					searchable={false}
					className={province ? 'dirty-input' : ''}
					onChange={value => setProvince(value?.toString())}
					data={temp?.provinces.map(item => ({ label: item, value: item }))}
				/>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					{/* <Row className='flex items-center mb-4 py-4'>
						<Col className='h-full' md={10}>
							<SourceCode code={source_codes?.R || ''} language='python' />
						</Col>
						<Col className='h-full m-auto' md={13}>
							<PanelLoader className='animate-fade-in h-full' loading={loading}>
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
					</Row> */}
					<Row className='flex flex-col items-center mb-4 py-4'>
						<Col className='mb-12' md={20}>
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
						<Col className='h-full' md={24}>
							<SourceCode code={source_codes?.R || ''} language='python' />
						</Col>
					</Row>
				</Grid>
			</div>
			<Tutorial data={markdowns?.R} language='r' />
		</div>
	);
};

export default ChartR;
