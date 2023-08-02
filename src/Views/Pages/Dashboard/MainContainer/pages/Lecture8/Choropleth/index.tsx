import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/choropleth.jpg';
import Part1 from './Part1';
import Part2 from './Part2';

const Choropleth = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Part1 />
			<Part2 />
		</Lecture>
	);
};

export default Choropleth;

const data = {
	title: 'Choropleth (Area) Map',
	subtitle: 'A Area chart on map with no size significance!',
	description: (
		<p>
			A Choropleth or Area map is a thematic map that visualizes data for predefined geographic regions, such as states,
			counties, or zip codes, by shading or coloring those regions based on the value of the data being represented, such as
			the number of cases for a specific disease, vaccination distribution, or the allocation of public health resources.
			The term `choropleth` comes from the Greek words `choros`, which means area or region, and `plethos`, which means
			quantity or magnitude. In a Choropleth map, different shades or colors represent different values of the data being
			displayed. Choropleth maps are useful when you want to visualize data distribution across a geographic region and
			identify patterns or trends in the data.
		</p>
	),
	whenToUse: (
		<span>
			Careful consideration should be taken when using Choropleth Maps due to their potential to mislead viewers, as larger
			regions may appear more significant than smaller ones, leading to a misinterpretation of the data. Additionally, using
			raw data values instead of normalized values can result in maps that do not accurately represent the density of the
			data. When deciding between a Choropleth map and a Bubble map, it is important to consider the nature of the data
			being presented and the research question being addressed. Bubble maps are suitable for comparing values across
			different geographic areas, while Choropleth maps are more appropriate for visualizing data distribution across a
			geographic region
		</span>
	),
	example: (
		<span>
			In this example, we show the power of geospatial visualization techniques in exploring public health and epidemiology
			data using a{' '}
			<a href='https://covid.cdc.gov/covid-data-tracker/#datatracker-home' target='_blank' rel='noreferrer'>
				CDC dataset
			</a>{' '}
			that contains COVID-19 case and death counts from March 2020 to November 2022. The dataset has been normalized by
			state population and is{' '}
			<a
				href='https://raw.githubusercontent.com/HIVE-UofT/Health-Data-Visualization/main/Lecture08/US%20Data/normalized_United_States_COVID-19_Cases_and_Deaths_by_State_over_Time_-_ARCHIVED.csv'
				target='_blank'
				rel='noreferrer'>
				available
			</a>{' '}
			for download.
		</span>
	),
};
