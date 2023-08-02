import Lecture from '@src/Components/Lecture/Lecture';
// import anatomy from '@assets/Images/dashboard/anatomies/calendar.svg';
import anatomy from '@assets/Images/dashboard/anatomies/tile.jpeg';
import ChartPython from './ChartPython';
import ChartR from './ChartR';

const Tile = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartR />
			<ChartPython />
		</Lecture>
	);
};

export default Tile;

const data = {
	title: 'Tile Plot',
	subtitle: 'Use color scale and position to display relationships!',
	description: (
		<p>
			The heatmap chart is commonly used to visualize data sets that have a large number of values, such as a matrix of data
			with many rows and columns. The heatmap chart allows for the easy identification of patterns and trends within the
			data, as well as the ability to quickly identify high and low values. When x and y are categories, we usually call
			this chart as a tile plot, which is a graphical representation of data that uses a grid of small rectangular tiles to
			display the values of a matrix of data. Each tile corresponds to a cell in the matrix, and the color of the tile
			represents the value of that cell. Tile charts are similar to heat maps in that they use color to represent data
			values, but they differ in that they use a grid of tiles rather than a continuous color scale.
		</p>
	),
	whenToUse: (
		<span>
			Heatmaps are more appropriate when you want to identify patterns in continuous data, and tile plots are more
			appropriate when you want to identify patterns in discrete data or when the data has a lot of missing values. However,
			both plots are similar in that they both use color to represent data values, and they can both be used to display data
			sets that have a large number of values.
		</span>
	),
	example: (
		<span>
			The{' '}
			<a
				href='https://open.canada.ca/data/en/dataset/153df6d8-0024-4f29-acb1-b0c960013fe7'
				target='_blank'
				rel='noreferrer'>
				dataset
			</a>{' '}
			we use to generate the following Tile plot is published by Statistics Canada and describes the proportion of the
			population with one or more underlying health conditions that are believed to increase the risk of negative outcomes
			following COVID-19 infection, including hospitalization and death. Estimates are based on data from the 2017-2018
			Canadian Community Health Survey, and are provided for the Canadian adult (age 18 and older) population by select
			demographic and socio-economic characteristics at the national and provincial/territorial level.
		</span>
	),
};
