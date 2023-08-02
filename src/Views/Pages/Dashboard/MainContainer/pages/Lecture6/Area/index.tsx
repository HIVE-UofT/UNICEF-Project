import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/area.svg';
import ChartPython from './ChartPython';
import ChartNormalized from './ChartNormalized';
import ChartPresentation from './ChartPresentation';

const Area = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
			<ChartNormalized />
			<ChartPresentation />
		</Lecture>
	);
};

export default Area;

const data = {
	title: 'Area Chart',
	subtitle: 'A Line Chart with Filled Area!',
	description: (
		<p>
			Area graphs are simple line charts with the area between the line and the evolving axis filled with a colour or
			shading. They are mainly used to visualize the development of a quantitative variable over time. They are usually used
			with a stacked presentation to show an accumulative data trend or a part-to-whole relationship. The width of a stacked
			area chart at each point presents the total value of all the categories placed in the chart for that time point. A
			normalized area chart, or 100%-stacked area chart, is a graphical representation that helps you compare changes in
			proportions over time or across categories. This type of chart is especially useful when you want to examine the
			overall trends or patterns across different categories, while still being able to visualize the relative contribution
			of each category to the total. By stacking the categories on top of each other, it becomes easy to see how the
			proportions change over time or across different groups, while still being able to track the contribution of each
			category to the total.
		</p>
	),
	whenToUse: (
		<span>
			Stacked area charts are most effectively used to display the general trend of data by showing cumulative categories.
			100% (or normalized) stacked area charts are more appropriate when we want to analyze the distribution of categories
			as parts of a whole, rather than observing the cumulative total. However, if the value of each category is more
			significant than the total value of the variable, it is preferable to use a line chart. In cases where there is only
			one variable to visualize or when the variation between values of different categories is significant, a line chart is
			a more suitable option for presenting data. Area charts can mask minor changes in data, making it hard for viewers to
			comprehend the information when there is a lot of fluctuation. Additionally, area charts can exaggerate the
			differences in data when the range of data values is small. In such situations, it may be more practical to use
			another type of chart.
		</span>
	),
	example: (
		<span>
			The following area charts present
			<a
				href='https://data.cdc.gov/Case-Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36'
				target='_blank'
				rel='noreferrer'>
				United States COVID-19 Deaths Trend by State
			</a>{' '}
			over time. This dataset, updated daily, contains data on COVID-19 cases and deaths in the United States from January
			2020 to the present day. The information is compiled from various sources, including state and territorial health
			departments, and is used to monitor the spread of COVID-19 and its impact on the US population. Researchers,
			policymakers, and public health officials can use this dataset to track the progression of COVID-19 and its effects on
			the US population, as well as to identify patterns and trends in cases and deaths over time and across different
			geographic regions.
		</span>
	),
};
