import { Else, If } from 'tsx-statements';
import Btn from '@src/Components/BTN/BTN';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import PanelLoader from '@src/Components/PanelLoader';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns } from '@src/Data/markdowns/Lecture9/bump.markdown';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import { CONFIG } from '@src/App/Config/constants';
import { useAdvancedState } from 'ahq-front-tools';

const Chart = () => {
	const { Get } = useFetch();
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(false);
	const { temp, set } = useData({ selector_states: [] });
	// const [states, setStates] = useState<string[]>(['AL', 'CA', 'MA', 'NY', 'TX', 'FL', 'NJ', 'AR', 'WA', 'WI', 'OH']);
	const states = useAdvancedState<string[]>(['AL', 'CA', 'MA', 'NY', 'TX', 'FL', 'NJ', 'AR', 'WA', 'WI', 'OH']);

	// ? ------------------------------------ functions -------------------------------------

	const getResult = async () => {
		try {
			setLoading(true);
			states.set.org(states.tmp);

			//?  result
			let concat_selections = concatSelections();

			const plot = await fetch(`${CONFIG.SERVER}/bump/plot?states=${concat_selections}`).then(res => {
				return res.blob();
			});

			setImg(URL.createObjectURL(plot));
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const concatSelections = () => {
		let res = '';
		res = states.tmp.reduce((res, state, i) => {
			res += state;
			if (i !== states.tmp.length - 1) res += '____';
			return res;
		});

		// for (let i = 0; i < states.tmp.length; i++) {
		// 	res += states.tmp[i];
		// 	if (i !== states.tmp.length - 1) res += '____';
		// }

		return res;
	};

	// ? ------------------------------------ useEffects -------------------------------------

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { states } = await Get({ url: `/bump/selections` });

				set.temp({ selector_states: states });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	// ---------------------------------------------------------------------------------------

	return (
		<div className='chart'>
			<div className='inputs'>
				<h3 className='py-2 text-sm font-medium'>Select States of Interest</h3>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					defaultValue={states.tmp}
					onClean={() => states.set.tmp([])}
					onChange={(value, _) => states.set.tmp(value)}
					placeholder='Select states'
					data={temp?.selector_states.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn disabled={states.tmp.length < 1} className={states.tmp.length >= 1 ? 'active' : ''} onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center mb-8'>
						<Col className='my-4 h-full' md={24}>
							<PanelLoader className='animate-fade-in loader' loading={loading}>
								<img
									src={img}
									style={{
										width: '58rem',
										height: `${
											states.org.length < 8
												? 11
												: states.org.length < 12
												? states.org.length * 1.75
												: states.org.length < 22
												? states.org.length * 1.85
												: states.org.length < 38
												? states.org.length * 2
												: states.org.length * 2.25
										}rem`,
									}}
									className='animate-fade-in transition-all min-h-0 m-auto'
									alt=''
									onClick={async () => {
										var image = new Image();
										image.src = img;
										const w: any = window.open('');
										w?.document?.write(image?.outerHTML);
									}}
								/>
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

export default Chart;
