import Btn from '@src/Components/BTN/BTN';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { classes } from '@src/Tools/Utils/React';
import { Col, Grid, Row, TagPicker, Slider } from 'rsuite';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { markdowns } from '@src/Data/markdowns/Lecture9/upset.markdown';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import { CONFIG } from '@src/App/Config/constants';

const Chart = () => {
	const { Get } = useFetch();
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [img, setImg] = useState('');
	const [threshold, setThreshold] = useState(50);
	const { temp: selections, set: setSelections } = useData({
		date: 2015,
		age: '12 to 17 years',
		sex: 'Females',
		provinces: ['Ontario', 'Manitoba', 'Saskatchewan', 'Alberta', 'British Columbia'],
	});
	const { temp: images, set: setImages } = useData({
		plot1: '',
		plot2: '',
		plot3: '',
	});
	const { temp, set } = useData<{ [key: string]: any[] }>({ date: [], age: [], sex: [], provinces: [] });

	// ? --------------------------- functions --------------------------------

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			const provinces_string = provincesMaker();

			//? part1 result
			const plot1 = await fetch(
				`${CONFIG.SERVER}/upset/plot?date=${selections?.date}&age=${selections?.age}&sex=${selections?.sex}&provinces=${provinces_string}&threshold=50&part=1`
			).then(res => {
				return res.text();
			});

			//? part2 result
			const plot2 = await fetch(
				`${CONFIG.SERVER}/upset/plot?date=${selections?.date}&age=${selections?.age}&sex=${selections?.sex}&provinces=${provinces_string}&threshold=50&part=2`
			).then(res => {
				return res.text();
			});

			//? part3 result
			const plot3 = await fetch(
				`${CONFIG.SERVER}/upset/plot?date=${selections?.date}&age=${selections?.age}&sex=${selections?.sex}&provinces=${provinces_string}&threshold=50&part=3`
			).then(res => {
				return res.text();
			});

			setImages.temp({ plot1, plot2, plot3 });

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const provincesMaker = () => {
		let res = '';
		let length = selections?.provinces.length;
		for (let i = 0; i < length; i++) {
			res += selections?.provinces[i];
			if (i !== length - 1) res += '____';
		}

		return res;
	};

	const provincesSelectorOnChange = (value: any) => {
		if (value?.length <= 5) setSelections?.ou.temp('provinces', value);
	};

	// ? ------------------------------ useEffects --------------------------------

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { date, age, sex, province } = await Get({ url: `/upset/selections` });

				set.temp({ date, age, sex, provinces: province });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	// ---------------------------------------------------------------------------

	return (
		<div className='chart'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				BOX PLOT IN PYTHON
			</h1>
			<div className='inputs'>
				<div className='flex items-center mb-2'>
					{[...Array(3)]?.map((_, i) => {
						const key = i === 0 ? 'sex' : i === 1 ? 'age' : 'date';
						return (
							<Selector
								value={i === 0 ? selections?.sex : i === 1 ? selections?.age : selections?.date}
								placeholder={i === 0 ? selections?.sex : i === 1 ? selections?.age : selections?.date.toString()}
								cleanable={false}
								searchable={false}
								label={i === 0 ? 'Select Sex' : i === 1 ? 'Select Age' : 'Select Date'}
								{...classes({
									'dirty-input': i === 0 ? !!selections?.sex : i === 1 ? !!selections?.age : !!selections?.date,
								})}
								onChange={value =>
									i === 0
										? setSelections.ou.temp('sex', value?.toString())
										: i === 1
										? setSelections.ou.temp('age', value?.toString())
										: setSelections.ou.temp('date', value)
								}
								data={temp?.[key].map(item => ({ label: item, value: item }))}
							/>
						);
					})}
				</div>
				<label className='mt-2 ml-0.5 text-xs text-tertiary animate-fade-in'>Select Province</label>
				<TagPicker
					searchable={false}
					value={selections?.provinces}
					placement='autoVerticalEnd'
					placeholder='Select Province'
					onClean={() => setSelections?.ou.temp('provinces', [])}
					data={temp?.provinces.map(item => ({ label: item, value: item }))}
					onChange={(value, _) => setSelections?.ou.temp('provinces', value)}
				/>
				<h3 className='text-sm my-4 font-medium'>Select Threshold</h3>
				<div className='relative pl-1 mb-4'>
					<div className='relative w-full'>
						<Slider
							min={20}
							max={100}
							progress
							defaultValue={threshold}
							onChange={value => setThreshold(value)}
							className='z-10'
						/>
						<label className='absolute top-3.5 -left-2'>20</label>
						<label className='absolute top-3.5 -right-2'>100</label>
					</div>
				</div>
				<div className='see-result-btn'>
					<Btn
						disabled={
							// selections?.provinces.length > 5 ||
							selections?.provinces.length < 1 || !selections?.age || !selections?.sex || !selections?.date
						}
						className={
							// selections?.provinces.length <= 5 &&
							selections?.provinces.length >= 1 && !!selections?.age && !!selections?.sex && !!selections?.date
								? 'active'
								: ''
						}
						onClick={getResult}>
						See Result
					</Btn>
				</div>
			</div>
			<div className='result'>
				<Grid className='result-grid animate-fade-in'>
					{[...Array(3)].map((_, i) => (
						<div key={i}>
							<Row className='flex flex-col items-center mb-2'>
								<Col md={16}>
									<PanelLoader className='animate-fade-in loader' loading={loading}>
										<iframe
											srcDoc={i === 0 ? images?.plot1 : i === 1 ? images?.plot2 : images?.plot3}
											title='html'
											style={{ height: '27rem' }}
											className='w-full animate-fade-in'
										/>
									</PanelLoader>
								</Col>
							</Row>
							<Row>
								<Tutorial
									data={i === 0 ? markdowns?.PART1 : i === 1 ? markdowns?.PART2 : markdowns?.PART3}
									language='python'
								/>
							</Row>
						</div>
					))}
				</Grid>
			</div>
		</div>
	);
};

export default Chart;
