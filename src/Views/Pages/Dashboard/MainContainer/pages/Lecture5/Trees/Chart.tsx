import { Else, If } from 'tsx-statements';
import Btn from '@src/Components/BTN/BTN';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState, useRef, IframeHTMLAttributes } from 'react';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import PanelLoader from '@src/Components/PanelLoader';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns } from '@src/Data/markdowns/Lecture5/tree.markdown';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';

const ChartPython = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>();
	const [showResult, setShowResult] = useState(false);
	const { temp, set } = useData({ selector_items: [] });
	const [selections, setSelections] = useState<string[]>([
		'Sepsis',
		'Diabetes',
		'Vascular and unspecified dementia',
		'Alzheimer disease',
	]);

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			//?  result
			let concat_selections = concatSelections();
			const { plot_file_format, config, plot } = await Get({ url: `/lecture5/tree-chart?selections=${concat_selections}` });

			setImg(atob(plot));
			setLoading(false);

			setTimeout(() => {
				const svgElement = iframeRef?.current?.contentWindow?.document?.querySelector('svg');
				if (svgElement) {
					const g = svgElement?.querySelector('g');
					if (g)
						g.setAttribute('transform', 'translate(452.21566274220527,-33.11781938855307) scale(0.5946035575013608)');
				}
			}, 300);
		} catch (e) {
			console.log(e);
		}
	};

	const concatSelections = () => {
		let res = '';
		for (let i = 0; i < selections.length; i++) {
			res += selections[i];
			if (i !== selections.length - 1) res += '____';
		}

		return res;
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { group } = await Get({ url: `/lecture5/tree-selections` });

				set.temp({ selector_items: group });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart'>
			<h1 className='text-orange-800 pt-2 pl-1 font-medium text-2xl bg-gradient-to-r flex rounded-md'>
				TREES CHART IN PYTHON
			</h1>
			<div className='inputs'>
				<h3 className='py-2 text-sm font-medium'>Select Groups of interest</h3>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					defaultValue={selections}
					onClean={() => setSelections([])}
					onChange={(value, _) => setSelections(value)}
					placeholder='Select Groups of interest'
					data={temp?.selector_items.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn disabled={selections.length < 1} className={selections.length >= 1 ? 'active' : ''} onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-8 w-full'>
						<Col md={24}>
							<PanelLoader className='animate-fade-in' loading={loading}>
								<If condition={showResult}>
									<iframe
										srcDoc={img}
										title='html'
										ref={iframeRef as any}
										style={{ height: '27rem' }}
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
						<Tutorial data={markdowns?.PYTHON} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartPython;
