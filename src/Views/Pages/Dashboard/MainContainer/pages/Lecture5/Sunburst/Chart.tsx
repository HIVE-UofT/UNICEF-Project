import SourceCode from '@src/Components/Lecture/SourceCode';
import PanelLoader from '@src/Components/PanelLoader';
import { plots_markdown_code } from '@src/Data/markdowns/Lecture5/sunburst.markdown';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Row, Grid, Col } from 'rsuite';

const Chart = () => {
	const images = ['interactive_sunburst.html', 'sunburst_total.html'];

	return (
		<div className='chart'>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					{plots_markdown_code?.map(({ line, code }, i) => {
						return (
							<div className='mb-14'>
								<div className='tutorial'>
									<ReactMarkdown children={line} className='mb-6' rehypePlugins={[rehypeRaw]} />
								</div>
								<Row className='flex items-center'>
									<Col className='justify-self-start h-full' md={11}>
										<SourceCode
											contentClass={i === 0 ? ' small-source-code' : ''}
											code={code}
											language={'python'}
										/>
									</Col>
									<Col className={i === 0 ? 'm-auto' : 'ml-auto'} md={11}>
										<iframe
											src={images[i]}
											title='html'
											style={{ height: i === 0 ? '25rem' : '30rem' }}
											className='w-full animate-fade-in'
										/>
									</Col>
								</Row>
							</div>
						);
					})}
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
