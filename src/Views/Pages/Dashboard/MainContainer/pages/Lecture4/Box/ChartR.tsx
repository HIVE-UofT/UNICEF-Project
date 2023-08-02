import Btn from '@src/Components/BTN/BTN';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { classes } from '@src/Tools/Utils/React';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import { CONFIG } from '@src/App/Config/constants';
import PanelLoader from '@src/Components/PanelLoader';
import Tutorial from '@src/Components/Lecture/Tutorial';
import SourceCode from '@src/Components/Lecture/SourceCode';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import { markdowns, source_codes } from '@src/Data/markdowns/Lecture4/box.markdown';

const ChartR = () => {
	const { Get } = useFetch();
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [img, setImg] = useState('');
	const { temp: selections, set: setSelections } = useData({
		sex: 'Females',
		response: 'Yes',
		countries: ['Austria', 'United States', 'Germany', 'France', 'Canada'],
	});
	const { temp, set } = useData<{ [key: string]: any[] }>({ sex: [], response: [], countries: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			const countries_string = countriesMaker();

			//? result
			const params = `?countries=${countries_string}&sex=${selections?.sex}&response=${selections?.response}`;
			const response = await fetch(`${CONFIG.SERVER}/lecture5/box-chart-r${params}`);
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			setImg(url);
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const countriesMaker = () => {
		let res = '';
		let length = selections?.countries.length;
		for (let i = 0; i < length; i++) {
			res += selections?.countries[i];
			if (i !== length - 1) res += '____';
		}

		return res;
	};

	const countriesSelectorOnChange = (value: any) => {
		if (value?.length <= 8) setSelections?.ou.temp('countries', value);
	};

	useEffect(() => {
		const getInputs = async () => {
			try {
				//? selectors data
				const { GEO: countries, SEX: sex, RESPONSE: response } = await Get({ url: `/lecture5/box-r-selections` });

				set.temp({ sex, response, countries });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart mt-4'>
			<h1 className='text-orange-800 py-2 pl-1 font-medium text-2xl mb-2 bg-gradient-to-r flex rounded-md'>
				BOX PLOT IN R
			</h1>
			<div className='inputs'>
				<div className='flex items-center mb-2'>
					{[...Array(2)]?.map((_, i) => {
						const key = i === 0 ? 'sex' : 'response';
						return (
							<Selector
								value={i === 0 ? selections?.sex : selections?.response}
								placeholder={i === 0 ? selections?.sex : selections?.response}
								cleanable={false}
								searchable={false}
								label={i === 0 ? 'Select Sex' : 'Select Response'}
								{...classes({
									'dirty-input': i === 0 ? !!selections?.sex : !!selections?.response,
								})}
								onChange={value =>
									i === 0
										? setSelections.ou.temp('sex', value?.toString())
										: setSelections.ou.temp('response', value?.toString())
								}
								data={temp?.[key].map(item => ({ label: item, value: item }))}
							/>
						);
					})}
				</div>
				<label className='mt-2 ml-0.5 text-xs text-tertiary animate-fade-in'>Select at most eight countries</label>
				<TagPicker
					searchable={false}
					value={selections?.countries}
					placement='autoVerticalEnd'
					placeholder='Select Countries'
					onClean={() => setSelections?.ou.temp('countries', [])}
					data={temp?.countries.map(item => ({ label: item, value: item }))}
					onChange={(value, _) => countriesSelectorOnChange(value)}
				/>
				<div className='see-result-btn'>
					<Btn
						disabled={
							selections?.countries.length > 8 ||
							selections?.countries.length < 2 ||
							!selections?.sex ||
							!selections?.response
						}
						className={
							selections?.countries.length <= 8 &&
							selections?.countries.length >= 2 &&
							!!selections?.sex &&
							!!selections?.response
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
					<Row className='flex items-center mb-4 py-4'>
						<Col className='h-full' md={10}>
							<SourceCode code={source_codes?.R} language={'python'} />
						</Col>
						<Col className='overflow-y-auto m-auto' style={{ maxHeight: '65vh' }} md={12}>
							<PanelLoader className='animate-fade-in h-full' loading={loading}>
								<If condition={showResult}>
									<img
										alt='plot'
										src={img}
										className='cursor-pointer transition-all transform mx-auto animate-fade-in'
										onClick={async () => {
											var image = new Image();
											image.src = img;
											const w: any = window.open('');
											w?.document?.write(image?.outerHTML);
										}}
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
					{/* <Row className='flex flex-col items-center mb-4'>
						<Col md={24}>
							<PanelLoader className='animate-fade-in' loading={loading}>
								<If condition={showResult}>
									<img
										alt='plot'
										src={img}
										className='cursor-pointer transition-all transform  w-1/2 mx-auto animate-fade-in'
										onClick={async () => {
											var image = new Image();
											image.src = img;
											const w: any = window.open('');
											w?.document?.write(image?.outerHTML);
										}}
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
						<Col md={24}>
							<SourceCode code={source_codes?.R} language={'python'} />
						</Col>
					</Row> */}
					<Row>
						<Tutorial data={markdowns?.R} language='python' />
					</Row>
				</Grid>
			</div>
		</div>
	);
};

export default ChartR;
