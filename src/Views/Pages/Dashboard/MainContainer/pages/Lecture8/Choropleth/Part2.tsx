import './index.scss';
import { Else, If } from 'tsx-statements';
import FaIcon from '@src/Components/FaIcon';
import { Col, Grid, Row, Panel } from 'rsuite';
import { CONFIG } from '@src/App/Config/constants';
import { useEffect, useState, useRef } from 'react';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useData } from '@tools/Hooks/useData/index';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { markdowns, source_codes } from '@data/markdowns/Lecture8/choropleth.markdown';
import useFetch from '@src/Tools/Hooks/useFetch';
import Selector from '@src/Components/Selector/Selector';

const Part2 = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData({ sex: [], bmi: [] });
	const { temp: selected, set: setSelected } = useData({ sex: 'Both sexes', bmi: 'Obese, body mass index 30.00 or higher' });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result

			const plot = await fetch(
				`${CONFIG.SERVER}/lecture8/area-map-chart?part=2&sex=${selected.sex}&bmi=${selected.bmi}`
			).then(res => {
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
				const { sex, bmi } = await Get({ url: `/lecture8/area-map-selections` });

				set.temp({ sex, bmi });
			} catch (e) {
				console.log(e);
			}
		};
		getInputs();
		getResult();
	}, []);

	useEffect(() => {
		getResult();
	}, [selected.sex, selected.bmi]);

	return (
		<div className='chart mt-8'>
			<hr />
			<div className='mt-6 mb-8'>
				<Tutorial data={markdowns?.PART2} language='python' />
			</div>

			<div className='inputs flex items-center mb-2'>
				<Selector
					value={selected.sex}
					placeholder={selected.sex}
					cleanable={false}
					label='Select Sex'
					searchable={false}
					className={selected.sex ? 'dirty-input' : ''}
					onChange={value => setSelected.ou.temp('sex', value?.toString())}
					data={temp?.sex.map(item => ({ label: item, value: item }))}
				/>
				<Selector
					value={selected.bmi}
					placeholder={selected.bmi}
					cleanable={false}
					label='Select BMI range'
					searchable={false}
					className={selected.bmi ? 'dirty-input' : ''}
					onChange={value => setSelected.ou.temp('bmi', value?.toString())}
					data={temp?.bmi.map(item => ({ label: item, value: item }))}
				/>
			</div>

			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-4'>
						<Col md={24}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										ref={iframeRef}
										style={{ height: '52rem' }}
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
					</Row>
					<Row className='details'>
						<Panel header='See the complete code' collapsible bordered>
							<SyntaxHighlighter language={'python'} style={atomOneLight} children={source_codes?.PART2} />
						</Panel>
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default Part2;
