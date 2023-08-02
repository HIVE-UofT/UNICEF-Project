import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/parallel.svg';
import Chart from './Chart';

const Parallel = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Parallel;

const data = {
	title: 'Parallel Coordinates',
	subtitle: 'Visual presentation of multivarial numberical data per category!',
	description: (
		<p>
			Parallel coordinates present the characteristics of a multivariate dataset by visualizing multiple quantitative
			variables for different categories in one display. The first vertical line defines the categorical variable, and each
			of the numeric variables has its own independently scaled axis. Each dataset record is displayed using a connected
			line that connects the values of numeric variables to their corresponding category. In an alternative design of
			parallel coordinates, the categorical line can be removed, and colour value presents different categories of data.
			Considering that each axis has its own scale, the direction and slope of line segments that connect the axes do not
			have any meaning. However, crossing lines between two axes present negative relationships in the data and parallel, or
			overlapping lines show consistent behaviour in the data.
		</p>
	),
	whenToUse: (
		<span>
			Parallel coordinates are used best to visualize a multivariate and large-scale dataset for pattern discovery or
			comparison of multiple variables for different categories. As the order of quantitative axes can influence the
			patterns, it is better to choose the order that better defines the context of the dataset while helping with the
			readability of the plot. Data-dense parallel coordinates can become over-cluttered with poor readability, which can be
			addressed by adding interactivity to the visualization to let users filter the categories or values to explore the
			data better. <b>Radar chart</b> is an alternative visualization for parallel coordinates that presents the vealue of
			independent numeric variables on normalized axes placed around a circle. However, the <b>cartesian coordinates</b>{' '}
			used in parallel coordinates are favoured over the polar coordinate in the Radar/Spider chart.
		</span>
	),
	example: (
		<span>
			The following parallel coordinates present the{' '}
			<a href='https://www.google.com/covid19/mobility/' target='_blank' rel='noreferrer'>
				mobility data
			</a>
			, provided by Google COVID-19 Community Mobility Report, to show changes in visits to places like grocery stores,
			workplaces, and parks during COVID-19 per state over time. We also map this view to the daily COVID cases and deaths
			to provide insights into the relationship between movement trends and COVID-19 situation in each state.
		</span>
	),
};
