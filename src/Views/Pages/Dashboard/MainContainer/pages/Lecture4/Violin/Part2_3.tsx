import Btn from '@src/Components/BTN/BTN';
import { Else, If } from 'tsx-statements';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { Col, Grid, Row, TagPicker } from 'rsuite';
import { markdowns } from '@src/Data/markdowns/Lecture4/violin.markdown';
import PanelLoader from '@src/Components/PanelLoader';
import useFetch from '../../../../../../../Tools/Hooks/useFetch';
import { useData } from '../../../../../../../Tools/Hooks/useData/index';
import Selector from '../../../../../../../Components/Selector/Selector';
import Tutorial from '@src/Components/Lecture/Tutorial';
import { classes } from '@src/Tools/Utils/React';

const Part2_3 = () => {
	const { Get } = useFetch();
	const [loading, setLoading] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const { temp: selections, set: setSelections } = useData({
		response: 'Yes',
		countries: ['Austria', 'United States', 'Germany', 'France', 'Canada'],
	});
	const { temp: img, set: setImg } = useData({
		plot2: '',
		plot3: '',
	});
	const { temp, set } = useData<{ [key: string]: any[] }>({ response: [], countries: [] });

	const getResult = async () => {
		try {
			setShowResult(true);
			setLoading(true);

			const countries_string = countriesMaker();

			//? part2 result
			const {
				plot_file_format: format2,
				config: config2,
				plot: plot2,
			} = await Get({
				url: `/lecture5/violin-chart`,
				params: {
					part: 2,
					countries: countries_string,
					response: selections?.response,
				},
			});
			//? part3 result
			const {
				plot_file_format: format3,
				config: config3,
				plot: plot3,
			} = await Get({
				url: `/lecture5/violin-chart`,
				params: {
					part: 3,
					countries: countries_string,
					response: selections?.response,
				},
			});

			setImg.temp({ plot2: atob(plot2), plot3: atob(plot3) });

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
				const { countries, response } = await Get({ url: `/lecture5/violin-selections?part=2` });

				set.temp({ response, countries });
			} catch (e) {
				console.log(e);
			}
		};
		getResult();
		getInputs();
	}, []);

	return (
		<div className='chart mt-4'>
			<hr />
			<div className='inputs mt-4'>
				<div className='flex items-center mb-2'>
					<Selector
						value={selections?.response}
						placeholder={selections?.response}
						cleanable={false}
						searchable={false}
						label={'Select Response'}
						{...classes({
							'dirty-input': !!selections?.response,
						})}
						onChange={value => setSelections.ou.temp('response', value?.toString())}
						data={temp?.response.map(item => ({ label: item, value: item }))}
					/>
				</div>
				<label className='mt-2 ml-0.5 text-xs text-tertiary animate-fade-in'>Select at most eight countries</label>
				<TagPicker
					searchable={false}
					placement='autoVerticalEnd'
					value={selections?.countries}
					placeholder='Select Countries'
					onClean={() => setSelections?.ou.temp('countries', [])}
					onChange={(value, _) => countriesSelectorOnChange(value)}
					data={temp?.countries.map(item => ({ label: item, value: item }))}
				/>
				<div className='see-result-btn'>
					<Btn
						disabled={selections?.countries.length > 8 || selections?.countries.length < 1 || !selections?.response}
						className={
							selections?.countries.length <= 8 && selections?.countries.length >= 1 && !!selections?.response
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
					{[...Array(2)]?.map((_, i) => {
						return (
							<div>
								<Row className='flex flex-col items-center mb-2'>
									<Col md={24}>
										<PanelLoader className='animate-fade-in' loading={loading}>
											<If condition={showResult}>
												<iframe
													srcDoc={i === 0 ? img?.plot2 : img?.plot3}
													title='html'
													style={{ height: '30rem' }}
													className='w-1/2 mx-auto animate-fade-in'
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
									<Tutorial data={i === 0 ? markdowns?.PART2 : markdowns?.PART3} language='python' />
								</Row>
							</div>
						);
					})}
				</Grid>
			</div>
		</div>
	);
};

export default Part2_3;
