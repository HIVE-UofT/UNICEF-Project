import { Else, If } from 'tsx-statements';
import Btn from '@src/Components/BTN/BTN';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import { CONFIG } from '@src/App/Config/constants';
import PanelLoader from '@src/Components/PanelLoader';
import { Col, Grid, Row, Slider, TagPicker } from 'rsuite';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { markdowns } from '@src/Data/markdowns/Lecture6/sankey.markdown';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import instruction from '@assets/Images/dashboard/lecture6/instruction.jpg';

const ChartPython = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [frequency, setFrequency] = useState(500);
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData({ selector_conditions: [] });
	const [conditions, setConditions] = useState<string[]>([
		'cardiovascular',
		'pulmonary',
		'renal',
		'gastrointestinal',
		'neurologic',
		'hematology',
		'infectious diseases',
		'surgery',
		'endocrine',
		'oncology',
		'general',
		'toxicology',
		'burns/trauma',
		'transplant',
	]);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result
			let concat_selections = concatSelections();

			const plot = await fetch(
				`${CONFIG.SERVER}/lecture6/sankey-python-chart?conditions=${concat_selections}&freq=${frequency}`
			).then(res => {
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
		for (let i = 0; i < conditions.length; i++) {
			res += conditions[i];
			if (i !== conditions.length - 1) res += '____';
		}

		return res;
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { conditions } = await Get({ url: `/lecture6/sankey-python-selections` });

				set.temp({ selector_conditions: conditions });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 pt-2 pl-1 font-medium text-2xl bg-gradient-to-r flex rounded-md'>
				SANKEY DIAGRAM IN PYTHON
			</h1>
			<div className='my-8'>
				<img className='w-2/3 mx-auto my-6' src={instruction} alt='instruction' />
				<Tutorial data={markdowns?.PYTHON_PART1} language='python' />
			</div>

			<Tutorial data={markdowns?.PYTHON_PART2} language='python' />

			<div className='inputs'>
				<h3 className='text-sm mb-3 font-medium'>Minimum Frequency</h3>
				<div className='relative pl-1 mb-8'>
					<div className='relative w-full'>
						<Slider
							min={100}
							max={5000}
							progress
							defaultValue={frequency}
							onChange={value => setFrequency(value)}
							className='z-10'
						/>
						<label className='absolute top-3.5 -left-2'>100</label>
						<label className='absolute top-3.5 -right-2'>5000</label>
					</div>
				</div>
				<h3 className='py-2 text-sm font-medium'>Exclude health conditions from the visualization</h3>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					defaultValue={conditions}
					onClean={() => setConditions([])}
					onChange={(value, _) => setConditions(value)}
					placeholder='Select health conditions'
					data={temp?.selector_conditions.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn disabled={conditions.length < 1} className={conditions.length >= 1 ? 'active' : ''} onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center'>
						<Col md={17}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '45rem' }}
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
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
