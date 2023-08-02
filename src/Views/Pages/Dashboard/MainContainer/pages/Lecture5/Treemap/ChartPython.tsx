import rehypeRaw from 'rehype-raw';
import { Else, If } from 'tsx-statements';
import ReactMarkdown from 'react-markdown';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import PanelLoader from '@src/Components/PanelLoader';
import Selector from '@src/Components/Selector/Selector';
import { Col, Grid, Radio, RadioGroup, Row } from 'rsuite';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import { markdowns, instruction, source_codes } from '@src/Data/markdowns/Lecture5/treemap.markdown';
import Btn from '@src/Components/BTN/BTN';

const ChartPython = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const { temp, set } = useData({ conditions: [] });
	const [condition, setCondition] = useState('0-24');
	const [showResult, setShowResult] = useState(false);
	const [radioValue, setRadioValue] = useState('Age Group');

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result
			const { plot_file_format, config, plot } = await Get({
				url: `/lecture5/treemap-chart?type=${radioValue}&value=${condition}`,
			});

			console.log(condition);

			setImg(atob(plot));
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const {
					'Age Group': age,
					'Health Conditions': conditions,
					Both: both,
				} = await Get({ url: `/lecture5/treemap-selections` });

				set.temp({ conditions: conditions });
			} catch (e) {
				console.log(e);
			}
		};

		getResult();
		getInputs();
	}, []);

	// useEffect(() => {
	// }, [radioValue, condition]);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 pl-1 font-medium text-2xl bg-gradient-to-r flex rounded-md'>
				TREEMAP CHART IN PYTHON
			</h1>
			<div className='inputs'>
				<h3 className=' text-sm font-medium'>Select the hierarchy variable</h3>
				<div className='flex items-center mb-1 relative'>
					<RadioGroup
						className='-ml-5 z-10'
						inline
						name='radio-name'
						value={radioValue}
						onChange={value => setRadioValue(value.toString())}>
						<Radio value='Age Group'>Age Group</Radio>
						<Radio value='Health Conditions'>Health Conditions</Radio>
						<Radio value='Both'>both</Radio>
					</RadioGroup>
					<div className='absolute w-full -mt-4 flex-center'>
						<Btn className='' onClick={getResult}>
							See Result
						</Btn>
					</div>
				</div>
				<ReactMarkdown children={instruction} rehypePlugins={[rehypeRaw]} />
				{radioValue === 'Health Conditions' && (
					<Selector
						value={condition}
						placeholder={condition}
						placement='bottom'
						cleanable={false}
						label='Select Age'
						searchable={false}
						className={condition ? 'dirty-input mt-3 animate-fade-in' : 'mt-3 animate-fade-in'}
						onChange={value => setCondition(value?.toString())}
						data={temp?.conditions.map(item => ({ label: item, value: item }))}
					/>
				)}
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex items-center mb-8'>
						<Col className='justify-self-start h-full' md={11}>
							<SourceCode code={source_codes?.PYTHON} language={'python'} />
						</Col>
						<Col className='ml-auto' md={11}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '30rem' }}
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
						<Tutorial data={markdowns?.PYTHON} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
