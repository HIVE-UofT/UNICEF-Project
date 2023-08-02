import { Else, If } from 'tsx-statements';
import FaIcon from '@src/Components/FaIcon';
import { Col, Grid, Row, Panel } from 'rsuite';
import useFetch from '@src/Tools/Hooks/useFetch';
import { CONFIG } from '@src/App/Config/constants';
import { useEffect, useState, useRef } from 'react';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { markdowns } from '@data/markdowns/Lecture9/chord.markdown';

const Chart = () => {
	const [img, setImg] = useState('');
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);

	// ? ----------------------------------- functions ----------------------------------

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result
			const plot = await fetch(`${CONFIG.SERVER}/chord/plot`).then(res => {
				return res.text();
			});

			setImg(plot);
			setLoading(false);

			setTimeout(() => {
				const body = iframeRef?.current?.contentWindow?.document?.querySelector('body');
				if (body) {
					// body.setAttribute('style', 'display: flex; justify-content: center;');
				}

				const svgElement = iframeRef?.current?.contentWindow?.document?.querySelector('svg');
				if (svgElement) {
					svgElement.setAttribute('style', 'width: 100%; height: 100%');
					const g = svgElement?.querySelector('g');
					// if (g) g.setAttribute('transform', 'translate(435.5,472) scale(0.5)');
				}
			}, 100);
		} catch (e) {
			console.log(e);
		}
	};

	// ? ---------------------------------------- useEffect -----------------------------------------

	useEffect(() => {
		getResult();
	}, []);

	// ----------------------------------------------------------------------------------------------

	return (
		<div className='chart'>
			<h1 className='text-orange-800 pt-2 pl-1 mb-4 font-medium text-2xl bg-gradient-to-r flex rounded-md'>
				CHORD DIAGRAM IN R
			</h1>

			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-4'>
						<Col md={16}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										ref={iframeRef}
										style={{ height: '38rem' }}
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
					<Row className='details'>
						<Tutorial data={markdowns?.PART1} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
