import { If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import useFetch from '@src/Tools/Hooks/useFetch';
import { CONFIG } from '@src/App/Config/constants';
import { useData } from '@src/Tools/Hooks/useData';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { Col, Grid, Radio, RadioGroup, Row } from 'rsuite';
import { markdowns } from '@src/Data/markdowns/Lecture6/stream.markdown';

const ChartR = () => {
	const { Get } = useFetch();
	const [loading, setLoading] = useState(false);
	const [year, setYear] = useState('2020');
	const [img, setImg] = useState('');
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData<{ [key: string]: any[] }>({ years: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const plot = await fetch(`${CONFIG.SERVER}/lecture6/stream-r?part=1&year=${year}`).then(res => {
				return res.text();
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
				//? selector data
				const { year } = await Get({ url: `/lecture6/stream-r-selections` });

				set.temp({ years: year });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	useEffect(() => {
		getResult();
	}, [year]);

	return (
		<div className='chart mt-4'>
			<h1 className='text-orange-800 pt-2 pl-1 font-medium text-2xl bg-gradient-to-r flex rounded-md'>STREAM CHART IN R</h1>
			<div className='inputs'>
				<h3 className=' text-sm font-medium'>Select Year</h3>
				<div className='flex items-center mb-1'>
					<RadioGroup className='-ml-5' inline value={year} onChange={value => setYear(value.toString())}>
						{temp?.years?.map((year, i) => (
							<Radio value={year} key={i}>
								{year}
							</Radio>
						))}
						{/* <Radio value={temp.years[0]}>{temp.years[0]}</Radio>
						<Radio value={temp.years[1]}>{temp.years[1]}</Radio>
						<Radio value={temp.years[2]}>{temp.years[2]}</Radio>
						<Radio value={temp.years[3]}>{temp.years[3]}</Radio> */}
					</RadioGroup>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center'>
						<Col className='my-4' md={18}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '25rem' }}
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
