import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/sparkline.svg';
import ChartR from './ChartR';

const Sparkline = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartR />
		</Lecture>
	);
};

export default Sparkline;

const data = {
	title: 'Sparkline Visualization',
	subtitle: 'Small Line Charts to Visualize Trends!',
	description: (
		<p>
			Sparklines are a type of data visualization that utilizes small line charts to represent the progression of data over
			time. Each line corresponds to a category and displays the change in value over time on the y-axis, while the x-axis
			represents the progression of time. The primary advantage of using sparklines is that they allow for easy
			identification of trends and changes in data. Since sparklines are meant to be space-efficient, they do not show
			detailed x and y-axis information, only the overall trend line. Sparklines are particularly useful when you need to
			present a large amount of data in a limited space, such as in financial reports or other data-rich documents. By
			utilizing sparklines, you can create effective visualizations that effectively communicate the essence of your data,
			even in a compact format.
		</p>
	),
	whenToUse: (
		<span>
			Sparklines can be a useful tool for presenting an overview of trends in data, but they have limitations that may make
			them unsuitable for certain situations. One of the main drawbacks of sparklines is their lack of a scale, which means
			that they don't provide precise information about the data being shown. This can lead to different interpretations of
			the same data by different viewers. In addition, sparklines can be affected by outliers in the data, which may not be
			easily detectable due to the lack of a y-axis. This can have a significant impact on the trend line and the overall
			meaning of the data. It's important to note that sparklines may not be the best choice for presenting detailed or
			complex data, but they can be useful for giving a quick overview of trends. By adding interactivity to sparklines,
			users can gain more information about the data behind the trend lines and address some of the limitations of this
			technique caused by the lack of x and y axes.
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
