import rehypeRaw from 'rehype-raw';
import { Col, Grid, Row } from 'rsuite';
import ReactMarkdown from 'react-markdown';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import PanelLoader from '@src/Components/PanelLoader';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import { markdowns, plots_markdown_code } from '@src/Data/markdowns/Lecture2/pie.markdown';

const Chart = () => {
	const { Get } = useFetch();
	const [loading, setLoading] = useState(false);
	const { temp: img_temp, set: img_set } = useData<{ [key: string]: string }>(
		{ first_img: '', second_img: '', third_img: '' },
		[]
	);

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				//? pie charts
				const {
					plots: {
						'first-plot': { content: first_plot, format: first_format },
						'second-plot': { content: second_plot, format: second_format },
						'third-plot': { content: third_plot, format: third_format },
					},
				} = await Get({ url: `/lecture2/pie-charts` });

				img_set.temp({ first_img: atob(first_plot), second_img: atob(second_plot), third_img: atob(third_plot) });

				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};

		getData();
	}, []);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 pt-2 font-medium text-2xl bg-gradient-to-r flex rounded-md'>PIE CHART IN PYTHON</h1>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='details mb-8'>
						<Tutorial data={markdowns} language='python' />
					</Row>
					<div>
						{plots_markdown_code?.map(({ line, code }, i) => {
							const key = i === 0 ? 'first_img' : i === 1 ? 'second_img' : 'third_img';
							return (
								<div className='mb-14'>
									<div className='tutorial'>
										<ReactMarkdown children={line || ''} className='mb-6' rehypePlugins={[rehypeRaw]} />
									</div>
									<Row className='flex items-center'>
										<Col className='justify-self-start h-full' md={10}>
											<SourceCode
												contentClass={i === 0 ? ' small-source-code' : i === 1 ? 'mini-source-code' : ''}
												code={code}
												language={'python'}
											/>
										</Col>
										<Col className='ml-auto' md={i === 2 ? 13 : 12}>
											<PanelLoader className='animate-fade-in' loading={loading}>
												<iframe
													srcDoc={img_temp?.[key]}
													title='html'
													style={{ height: i === 0 || i === 1 ? '22rem' : '24rem' }}
													className='w-full animate-fade-in'
												/>
											</PanelLoader>
										</Col>
									</Row>
								</div>
							);
						})}
					</div>
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
