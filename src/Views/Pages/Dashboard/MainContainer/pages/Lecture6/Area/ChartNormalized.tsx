import { Else, If } from 'tsx-statements';
import Btn from '@src/Components/BTN/BTN';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import PanelLoader from '@src/Components/PanelLoader';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture6/area.markdown';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import SourceCode from '@src/Components/Lecture/SourceCode';
import { CONFIG } from '@src/App/Config/constants';

const ChartNormalized = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData({ selector_states: [] });
	const [states, setStates] = useState<string[]>([
		'Alabama',
		'Arizona',
		'California',
		'Texas',
		'Florida',
		'Massachusetts',
		'New York',
	]);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result
			let concat_selections = concatSelections();

			const plot = await fetch(`${CONFIG.SERVER}/lecture6/area-chart?states=${concat_selections}&part=2`).then(res => {
				return res.text();
			});

			setImg(plot);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const concatSelections = () => {
		let res = '';
		for (let i = 0; i < states.length; i++) {
			res += states[i];
			if (i !== states.length - 1) res += '____';
		}

		return res;
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { states } = await Get({ url: `/lecture6/area-selections` });

				set.temp({ selector_states: states });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart mt-4'>
			<hr />
			<div className='inputs'>
				<h3 className='py-2 text-sm font-medium'>Select which states to include in the area chart</h3>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					defaultValue={states}
					onClean={() => setStates([])}
					onChange={(value, _) => setStates(value)}
					placeholder='Select states'
					data={temp?.selector_states.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn disabled={states.length < 1} className={states.length >= 1 ? 'active' : ''} onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center my-4'>
						<Col md={17}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '23rem' }}
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
					<Row>
						<Tutorial data={markdowns?.NORMALIZED} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartNormalized;
