import { Col, Grid, Row } from 'rsuite';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { classes } from '@src/Tools/Utils/React';
import { CONFIG } from '@src/App/Config/constants';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns } from '@src/Data/markdowns/Lecture6/sankey.markdown';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';

const ChartR = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const [year, setYear] = useState('1971/1972');
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData<{ [key: string]: any[] }>({ years: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? result
			const plot = await fetch(`${CONFIG.SERVER}/lecture6/sankey-r-chart?year=${year}`).then(res => {
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
				const { year } = await Get({ url: `/lecture6/sankey-r-selections` });

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
		<div className='chart'>
			<hr />
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 mt-4 bg-gradient-to-r flex rounded-md'>
				SANKEY DIAGRAM IN R
			</h1>
			<div className='inputs'>
				<div className='flex items-center mb-2'>
					<Selector
						value={year}
						placeholder={year}
						cleanable={false}
						placement='autoVerticalStart'
						searchable={false}
						label={'Select Years'}
						{...classes({
							'dirty-input': !!year,
						})}
						onChange={value => setYear(value.toString())}
						data={temp?.years.map(item => ({ label: item, value: item }))}
					/>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-4'>
						<Col md={14}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										style={{ height: '35rem' }}
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
						<Tutorial data={markdowns?.R} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartR;
