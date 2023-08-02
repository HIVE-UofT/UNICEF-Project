import { Else, If } from 'tsx-statements';
import Btn from '@src/Components/BTN/BTN';
import FaIcon from '@src/Components/FaIcon';
import { useEffect, useState } from 'react';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import PanelLoader from '@src/Components/PanelLoader';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns } from '@src/Data/markdowns/Lecture9/funnel.markdown';
import Tutorial from '../../../../../../../Components/Lecture/Tutorial';
import { CONFIG } from '@src/App/Config/constants';

const Chart = () => {
	const { Get } = useFetch();
	const [images, setImages] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [selectorData, setSelectorData] = useState([]);
	const [ages, setAges] = useState<string[]>(['0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']);

	// ? ------------------------------------ functions -------------------------------------

	const getResults = async () => {
		try {
			setLoading(true);
			setImages([]);

			//?  result
			for (let i = 0; i < ages.length; i++) {
				const plot = await fetch(`${CONFIG.SERVER}/funnel/plot?age=${ages[i]}`).then(res => {
					return res.text();
				});
				setImages(imgs => [...imgs, plot]);
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const ages = await Get({ url: `/funnel/selections` });

				setSelectorData(ages);
			} catch (e) {
				console.log(e);
			}
		};
		getInputs();
		getResults();
	}, []);

	// ---------------------------------------------------------------------------------------

	return (
		<div className='chart'>
			<div className='inputs'>
				<h3 className='py-2 text-sm font-medium'>Select Age Categories</h3>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					defaultValue={ages}
					onClean={() => setAges([])}
					onChange={(value, _) => setAges(value)}
					placeholder='Select Age'
					data={selectorData?.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn disabled={ages.length < 1} className={ages.length >= 1 ? 'active' : ''} onClick={getResults}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					<Row className='flex flex-col items-center'>
						<Col className='mb-4' md={24}>
							{images?.map((img, i) => {
								return (
									<Col key={i} md={6}>
										<PanelLoader className='animate-fade-in loader' loading={loading}>
											<iframe
												srcDoc={img}
												title='html'
												// ref={iframeRef}
												style={{ height: '30rem' }}
												className='w-full animate-fade-in'
											/>
										</PanelLoader>
									</Col>
								);
							})}
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
