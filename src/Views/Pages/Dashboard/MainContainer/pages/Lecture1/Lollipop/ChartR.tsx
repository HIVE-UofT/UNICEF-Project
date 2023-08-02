import Btn from '@src/Components/BTN/BTN';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import { markdowns } from '@src/Data/markdowns/Lecture1/lollipop.markdown';
import PanelLoader from '@src/Components/PanelLoader';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import { source_codes } from '@src/Data/markdowns/Lecture1/lollipop.markdown';
import Tutorial from '@src/Components/Lecture/Tutorial';

const ChartR = () => {
	const { Get } = useFetch();
	const [sex, setSex] = useState('Females');
	const [img, setImg] = useState('');
	const [year, setYear] = useState<number>(2015);
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData({ year: [], sex: [], indicator: [] });
	const [indicators, setIndicators] = useState<string[]>([
		'Perceived health (fair/poor)',
		'Perceived mental health (fair/poor)',
		'Perceived life stress (quite a bit/extremely stressful)',
		'Overweight (>=18 years)',
		'Obese (>=18 years)',
	]);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			const indicators_string = indicatorsMaker();

			//? matplot result
			const { plot_file_format, config, plot } = await Get({
				url: `/lecture1/lollipop-r?sex=${sex}&year=${year}&indicators=${indicators_string}`,
			});

			setImg(plot);

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const indicatorsMaker = () => {
		let indicators_string = '';
		for (let i = 0; i < indicators.length; i++) {
			indicators_string += indicators[i];
			if (i !== indicators.length - 1) indicators_string += '____';
		}

		return indicators_string;
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { year, sex, indicator } = await Get({ url: `/lecture1/lollipop-r-selections` });

				set.temp({ year: year, sex: sex, indicator: indicator });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart mt-4'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				LOLLIPOP CHART IN R
			</h1>
			<div className='inputs'>
				<div className='flex items-center mb-2'>
					<Selector
						value={year}
						placeholder={`${year}`}
						cleanable={false}
						searchable={false}
						label='Select Year'
						className={year ? 'dirty-input' : ''}
						onChange={value => setYear(Number(value))}
						data={temp?.year.map(item => ({ label: item, value: item }))}
					/>
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
				<label hidden={indicators.length >= 5} className='mt-2 ml-0.5 text-xs text-tertiary animate-fade-in'>
					Select at least five indicators
				</label>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					defaultValue={indicators}
					onClean={() => setIndicators([])}
					onChange={(value, _) => setIndicators(value)}
					placeholder='Select at least five indicators'
					data={temp?.indicator.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn
						disabled={indicators.length < 5 || !sex || !year}
						className={indicators.length >= 5 && !!sex && !!year ? 'active' : ''}
						onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-4 py-4'>
						<Col className='mb-12' md={16}>
							<PanelLoader className='animate-fade-in' loading={loading}>
								<If condition={showResult}>
									<img
										alt='plot'
										src={`data:image/svg+xml;base64,${img}`}
										className='cursor-pointer transition-all transform  w-full mx-auto animate-fade-in'
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
							<SourceCode code={source_codes?.R || ''} language='r' />
						</Col>
					</Row>
					<Row>
						<h1 className='text-orange-800 mt-3 font-semibold text-lg mb-4'>IMPLEMENTATION IN R</h1>
						<Tutorial data={markdowns?.R} language='r' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartR;
