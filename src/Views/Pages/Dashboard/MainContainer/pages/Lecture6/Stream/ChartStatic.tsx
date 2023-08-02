import { If } from 'tsx-statements';
import useFetch from '@src/Tools/Hooks/useFetch';
import { useData } from '@src/Tools/Hooks/useData';
import { useEffect, useState, useRef } from 'react';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { Col, Grid, Radio, RadioGroup, Row } from 'rsuite';
import { markdowns } from '@src/Data/markdowns/Lecture6/stream.markdown';
import { CONFIG } from '@src/App/Config/constants';

const ChartStatic = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [year, setYear] = useState('2020');
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData<{ [key: string]: any[] }>({ years: [] });

	// ? ----------------------------------- Utils -----------------------------------

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const plot = await fetch(`${CONFIG.SERVER}/lecture6/stream-r?part=2&year=${year}`).then(res => {
				return res.text();
			});

			setImg(btoa(plot));
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
				const { year } = await Get({ url: `/lecture6/stream-r-selections` });

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

	return (
		<div className='chart mt-4'>
			<hr />
			<div className='inputs'>
				<h3 className=' text-sm font-medium'>Select Year</h3>
				<div className='flex items-center mb-1'>
					<RadioGroup className='-ml-5' inline value={year} onChange={value => setYear(value.toString())}>
						{temp?.years?.map((year, i) => (
							<Radio value={year} key={i}>
								{year}
							</Radio>
						))}
						{/* <Radio value={temp.years[1]}>{temp.years[1]}</Radio>
						<Radio value={temp.years[2]}>{temp.years[2]}</Radio>
						<Radio value={temp.years[3]}>{temp.years[3]}</Radio> */}
					</RadioGroup>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center'>
						<Col className='my-4' md={14}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<img
										src={`data:image/svg+xml;base64,${img}`}
										className='w-full animate-fade-in'
										alt=''
										onClick={async () => {
											var image = new Image();
											image.src = `data:image/svg+xml;base64,${img}`;
											const w: any = window.open('');
											w?.document?.write(image?.outerHTML);
										}}
									/>
								</If>
							</PanelLoader>
						</Col>
					</Row>
					<Row>
						<Tutorial data={markdowns?.STATIC} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartStatic;
