import { Col, Grid, Row, Panel, TagPicker } from 'rsuite';
import useFetch from '@src/Tools/Hooks/useFetch';
import { CONFIG } from '@src/App/Config/constants';
import { useEffect, useState, useRef } from 'react';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { markdowns } from '@data/markdowns/Lecture9/parallel.markdown';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';

const Chart = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false);
	const { temp, set } = useData({ selector_states: [] });
	const [state, setState] = useState('AL');

	const getResult = async () => {
		try {
			setLoading(true);

			//?  result
			const plot = await fetch(`${CONFIG.SERVER}/parallel/plot?state=${state}`).then(res => {
				return res.text();
			});

			setImg(plot);
			setLoading(false);

			setTimeout(() => {
				const body = iframeRef?.current?.contentWindow?.document?.querySelector('body');
				if (body) {
					body.setAttribute('style', 'display: flex; justify-content: center;');
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
				const states = await Get({ url: `/parallel/selections` });

				set.temp({ selector_states: states });
			} catch (e) {
				console.log(e);
			}
		};
		getInputs();
		getResult();
	}, []);

	useEffect(() => {
		getResult();
	}, [state]);

	return (
		<div className='chart'>
			<div className='inputs'>
				<Selector
					value={state}
					placeholder={state}
					cleanable={false}
					label='Select state'
					searchable={false}
					className={state ? 'dirty-input' : ''}
					onChange={value => setState(value?.toString())}
					data={temp?.selector_states.map(item => ({ label: item, value: item }))}
				/>
				{/* <div className='see-result-btn'>
					<Btn disabled={states.length < 1} className={states.length >= 1 ? 'active' : ''} onClick={getResult}>
						See Result
					</Btn>
				</div> */}
			</div>

			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center my-4'>
						<Col md={22}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<iframe
									srcDoc={img}
									title='html'
									ref={iframeRef}
									style={{ height: '30rem' }}
									className='w-full animate-fade-in'
								/>
							</PanelLoader>
						</Col>
					</Row>
					<Row className='details'>
						<Tutorial data={markdowns?.PART1} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
