import Btn from '@src/Components/BTN/BTN';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import { markdowns } from '@src/Data/markdowns/Lecture4/violin.markdown';
import PanelLoader from '@src/Components/PanelLoader';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { classes } from '@src/Tools/Utils/React';
import ReactMarkdown from 'react-markdown';
import { part1_title } from '../../../../../../../Data/markdowns/Lecture4/violin.markdown';
import rehypeRaw from 'rehype-raw';

const Part1 = () => {
	const { Get } = useFetch();
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [img, setImg] = useState('');
	const { temp: selections, set: setSelections } = useData({
		age: 'All',
		sex: 'Females',
		response: 'Yes',
		countries: ['Austria', 'United States', 'Germany', 'France', 'Canada'],
	});
	const { temp, set } = useData<{ [key: string]: any[] }>({ age: [], sex: [], response: [], countries: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			const countries_string = countriesMaker();

			//? part1 result
			const { plot_file_format, config, plot } = await Get({
				url: `/lecture5/violin-chart`,
				params: {
					part: 1,
					countries: countries_string,
					age: selections?.age,
					sex: selections?.sex,
					response: selections?.response,
				},
			});

			setImg(atob(plot));

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const countriesMaker = () => {
		let res = '';
		let length = selections?.countries.length;
		for (let i = 0; i < length; i++) {
			res += selections?.countries[i];
			if (i !== length - 1) res += '____';
		}

		return res;
	};

	const countriesSelectorOnChange = (value: any) => {
		if (value?.length <= 8) setSelections?.ou.temp('countries', value);
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { countries, age, sex, response } = await Get({ url: `/lecture5/violin-selections?part=1` });

				set.temp({ age, sex, response, countries });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				VIOLIN PLOT IN PYTHON
			</h1>
			<h3 className='py-4 pl-1 text-black text-base font-medium'>{part1_title}</h3>
			<div className='inputs'>
				<div className='flex items-center mb-2'>
					{[...Array(3)]?.map((_, i) => {
						const key = i === 0 ? 'age' : i === 1 ? 'sex' : 'response';
						return (
							<Selector
								value={i === 0 ? selections?.age : i === 1 ? selections?.sex : selections?.response}
								placeholder={i === 0 ? selections?.age : i === 1 ? selections?.sex : selections?.response}
								cleanable={false}
								searchable={false}
								label={i === 0 ? 'Select Age' : i === 1 ? 'Select Sex' : 'Select Response'}
								{...classes({
									'dirty-input':
										i === 0 ? !!selections?.age : i === 1 ? !!selections?.sex : !!selections?.response,
								})}
								onChange={value =>
									i === 0
										? setSelections.ou.temp('age', value?.toString())
										: i === 1
										? setSelections.ou.temp('sex', value?.toString())
										: setSelections.ou.temp('response', value?.toString())
								}
								data={temp?.[key].map(item => ({ label: item, value: item }))}
							/>
						);
					})}
				</div>
				<label className='mt-2 ml-0.5 text-xs text-tertiary animate-fade-in'>Select at most eight countries</label>
				{/* <h3 className='py-2 text-sm font-medium'>Select at most eight countries</h3> */}
				<TagPicker
					searchable={false}
					value={selections?.countries}
					placement='autoVerticalEnd'
					placeholder='Select Countries'
					onClean={() => setSelections?.ou.temp('countries', [])}
					data={temp?.countries.map(item => ({ label: item, value: item }))}
					onChange={(value, _) => countriesSelectorOnChange(value)}
				/>
				<div className='see-result-btn'>
					<Btn
						disabled={
							selections?.countries.length > 8 ||
							selections?.countries.length < 1 ||
							!selections?.age ||
							!selections?.sex ||
							!selections?.response
						}
						className={
							selections?.countries.length <= 8 &&
							selections?.countries.length >= 1 &&
							!!selections?.age &&
							!!selections?.sex &&
							!!selections?.response
								? 'active'
								: ''
						}
						onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-2'>
						<Col md={24}>
							<PanelLoader className='animate-fade-in' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '30rem' }}
										className='w-1/2 mx-auto animate-fade-in'
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
						<Tutorial data={markdowns?.PART1} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default Part1;
