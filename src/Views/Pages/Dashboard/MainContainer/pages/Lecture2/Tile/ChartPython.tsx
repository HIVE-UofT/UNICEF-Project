import { Col, Grid, Row } from 'rsuite';
import { Else, If } from 'tsx-statements';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState, useRef } from 'react';
import { classes } from '@src/Tools/Utils/React';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture2/tile.markdown';
import PanelLoader from '@src/Components/PanelLoader';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';

const ChartPython = () => {
	const { Get } = useFetch();
	const [sex, setSex] = useState('Females');
	const [img, setImg] = useState('');
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData({ sex: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const {
				plot_file_format: matplot_format,
				config: matplot_config,
				plot: plot,
			} = await Get({
				url: `/lecture2/tile-python?sex=${sex}`,
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
					canvas.setAttribute('style', 'width: 900px !important; height: 100% !important;');
				}
			}, 100);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { sex } = await Get({ url: `/lecture2/tile-selections` });

				set.temp({ sex: sex });
			} catch (e) {
				console.log(e);
			}
		};

		getInputs();
	}, []);

	useEffect(() => {
		if (sex) {
			getResult();
		}
	}, [sex]);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				TILE PLOT IN PYTHON
			</h1>

			<div className='inputs flex items-center justify-between mb-2'>
				<Selector
					value={sex}
					placeholder={sex}
					cleanable={false}
					label='Select Sex'
					searchable={false}
					className={sex ? 'dirty-input' : ''}
					onChange={value => setSex(value?.toString())}
					data={temp?.sex.map(item => ({ label: item, value: item }))}
				/>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-4 py-4'>
						<Col className='mb-8' md={24}>
							<PanelLoader className='animate-fade-in' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										ref={iframeRef}
										title='html'
										style={{ height: '28rem' }}
										className='w-full animate-fade-in'
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
					<div>
						<Row className='details mb-8'>
							<Tutorial data={markdowns?.PYTHON} language='python' />
						</Row>
					</div>
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
