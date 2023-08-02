import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/stream.svg';
import ChartPython from './ChartPython';
import ChartR from './ChartR';
import ChartStatic from './ChartStatic';

const Stream = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
			<ChartR />
			<ChartStatic />
		</Lecture>
	);
};

export default Stream;

const data = {
	title: 'Stream Graph',
	subtitle: 'A Stacked Area Chart with a Central Baseline!',
	description: (
		<p>
			A Stream graph is a variation of the stacked area chart that plots the evolution of a quantity for several groups of
			data around a central baseline. Each stream shape in a stream graph presents a data category. The horizontal access in
			a stream graph presents the time scale, and the varying thickness of each stream is proportional to the value of the
			quantitative variable over time. The colour variable is used to either distinguish the categories or present different
			quantitative variables with the same scale related to the same category.
		</p>
	),
	whenToUse: (
		<span>
			Stream graphs are a useful tool for providing a high-level summary of time-series data with many categories. However,
			they may not be suitable for certain types of data. For example, they are not ideal for data that cannot be
			aggregated, such as age data. Additionally, if the goal is to compare individual data points, other visualizations,
			such as bar charts or scatter plots, may be more effective than stream graphs, which are better at highlighting trends
			and patterns over time. Furthermore, stream graphs may not be the best choice when dealing with datasets that contain
			significant negative values, as they are not well-suited to displaying negative values. In addition, if there are too
			many data series to be communicated effectively, stream graphs may become cluttered and difficult to interpret. In
			such cases, it may be more appropriate to use other visualization techniques that can handle larger amounts of data
			without sacrificing clarity and readability.
		</span>
	),
	example: (
		<span>
			The aggregated data in the following stream graph present number of COVID-19 deaths since the start of the pandemic to
			today in the USA, subdivided by states (
			<a href='https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD' target='_blank' rel='noreferrer'>
				Data Source
			</a>{' '}
			).
		</span>
	),
};
