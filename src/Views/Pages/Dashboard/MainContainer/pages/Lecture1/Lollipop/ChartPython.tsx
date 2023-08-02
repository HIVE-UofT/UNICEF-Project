import { Col, Grid, Row } from 'rsuite';
import { Else, If } from 'tsx-statements';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import { classes } from '@src/Tools/Utils/React';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture1/lollipop.markdown';
import PanelLoader from '@src/Components/PanelLoader';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';

const ChartPython = () => {
	const { Get } = useFetch();
	const [sex, setSex] = useState('Females');
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [age, setAge] = useState('Total (>=12 years)');
	const [indicator, setIndicator] = useState('Perceived health (fair/poor)');
	const { temp: img_temp, set: img_set } = useData({ matplot_img: '', plotly_img: '' }, []);
	const { temp, set } = useData<{ [key: string]: any[] }>({ age: [], sex: [], indicator: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//? matplot result
			const {
				plot_file_format: matplot_format,
				config: matplot_config,
				plot: matplot_plot,
			} = await Get({
				url: `/lecture1/lollipop-python?type=matplotlib&sex=${sex}&age=${age}&indicator=${indicator}`,
			});

			//? plotly result
			const {
				plot_file_format: plotly_format,
				config: plotly_config,
				plot: plotly_plot,
			} = await Get({
				url: `/lecture1/lollipop-python?type=plotly&sex=${sex}&age=${age}&indicator=${indicator}`,
			});

			const html = atob(plotly_plot);
			img_set.temp({ matplot_img: matplot_plot, plotly_img: html });

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { age, sex, indicator } = await Get({ url: `/lecture1/lollipop-python-selections` });

				set.temp({ age: age, sex: sex, indicator: indicator });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	useEffect(() => {
		if (age && sex && indicator) {
			getResult();
		}
	}, [age, sex, indicator]);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				LOLLIPOP CHART IN PYTHON - MATPLOTLIB
			</h1>

			<div className='inputs flex items-center'>
				{[...Array(3)]?.map((_, i) => {
					const key = i === 0 ? 'age' : i === 1 ? 'sex' : 'indicator';
					return (
						<Selector
							value={i === 0 ? age : i === 1 ? sex : indicator}
							placeholder={i === 0 ? age : i === 1 ? sex : indicator}
							cleanable={false}
							searchable={false}
							label={i === 0 ? 'Select the Age Range' : i === 1 ? 'Select Sex' : 'Select the Health Indicator'}
							{...classes({ 'dirty-input': i === 0 ? !!age : i === 1 ? !!sex : !!indicator })}
							onChange={value =>
								i === 0
									? setAge(value?.toString())
									: i === 1
									? setSex(value?.toString())
									: setIndicator(value?.toString())
							}
							data={temp?.[key].map(item => ({ label: item, value: item }))}
						/>
					);
				})}
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<div>
						<Row className='flex items-center mb-4 py-4'>
							<Col className='h-full' md={11}>
								<SourceCode code={source_codes?.MATPLOTLIB} language='python' />
							</Col>
							<Col className='h-full ml-auto' md={11}>
								<PanelLoader className='animate-fade-in h-full' loading={loading}>
									<If condition={showResult}>
										<img
											alt='plot'
											className='plot animate-fade-in'
											src={`data:image/jpeg;base64,${img_temp.matplot_img.substring(
												0,
												img_temp.matplot_img.length - 2
											)}`}
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
							<h1 className='text-orange-800 mt-3 font-semibold text-lg mb-4'>
								IMPLEMENTATION IN PYTHON - MATPLOTLIB
							</h1>
							<Tutorial data={markdowns?.MATPLOTLIB} language='python' />
						</Row>
					</div>
					<div>
						<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl -mb-2 bg-gradient-to-r flex rounded-md'>
							LOLLIPOP CHART IN PYTHON - PLOTLY
						</h1>

						<Row className='flex items-center py-4'>
							<Col className='justify-self-start h-full' md={11}>
								<SourceCode code={source_codes?.PLOTLY} language={'python'} />
							</Col>
							<Col className='ml-auto' md={11}>
								<PanelLoader className='animate-fade-in loader' loading={loading}>
									<If condition={showResult}>
										<iframe srcDoc={img_temp?.plotly_img} title='html' className='plotly animate-fade-in' />
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
						<Row className='details mb-8'>
							<h1 className='text-orange-800 mt-3 font-semibold text-lg mb-4'>IMPLEMENTATION IN PYTHON - PLOTLY</h1>
							<Tutorial data={markdowns?.PLOTLY} language='python' />
						</Row>
					</div>
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
