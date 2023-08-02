import { Col, Grid, Radio, RadioGroup, Row } from 'rsuite';
import { useEffect, useState, useRef } from 'react';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture6/sparkline.markdown';
import SourceCode from '@src/Components/Lecture/SourceCode';
import PanelLoader from '@src/Components/PanelLoader';
import { If } from 'tsx-statements';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import useFetch from '@src/Tools/Hooks/useFetch';
import { CONFIG } from '@src/App/Config/constants';

const ChartR = () => {
	const { Get } = useFetch();
	const [year, setYear] = useState('2020');
	const [loading, setLoading] = useState(false);
	const [img, setImg] = useState('');
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData<{ [key: string]: any[] }>({ years: [] });

	// ? ----------------------------------- Utils -----------------------------------

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const plot = await fetch(`${CONFIG.SERVER}/lecture6/sparkline-r-chart?year=${year}`).then(res => {
				return res.text();
			});

			setImg(plot);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	// ? --------------------------------- useEffect ---------------------------------

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selector data
				const { year } = await Get({ url: `/lecture6/sparkline-r-selections` });

				set.temp({ years: year });
			} catch (e) {
				console.log(e);
			}
		};
		getInputs();
	}, []);

	useEffect(() => {
		getResult();
	}, [year]);

	// --------------------------------------------------------------------------------------

	return (
		<div className='chart'>
			<div className='inputs'>
				<h3 className=' text-sm font-medium'>Select Year</h3>
				<div className='flex items-center mb-1'>
					<RadioGroup className='-ml-5' inline value={year} onChange={value => setYear(value.toString())}>
						{temp?.years?.map((year, i) => (
							<Radio value={year} key={i}>
								{year}
							</Radio>
						))}
						{/* <Radio value='2020'>2020</Radio>
						<Radio value='2021'>2021</Radio>
						<Radio value='2022'>2022</Radio>
						<Radio value='2023'>2023</Radio> */}
					</RadioGroup>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex items-center mb-8'>
						<Col className='justify-self-start h-full' md={11}>
							<SourceCode code={source_codes?.R} language={'python'} />
						</Col>
						<Col className='m-auto' md={9}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '30rem' }}
										className='w-full animate-fade-in'
									/>
								</If>
							</PanelLoader>
						</Col>
					</Row>
					<Row>
						<Tutorial data={markdowns?.R} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartR;
