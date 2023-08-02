import ChartR from './ChartR';
import ChartPython from './ChartPython';
import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/lollipop.svg';

const Lollipop = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
			<ChartR />
		</Lecture>
	);
};

export default Lollipop;

const data = {
	title: 'Lollipop Plot',
	subtitle: 'A Variation of Bar Charts to Visualize a Large Number of Categories',
	description: (
		<p>
			A Lollipop plot is a variation of a bar chart where the bar is replaced with a line ending with a dot/circle. The
			circles are usually placed at the top of the lines, and the end of the lines are anchored at a common baseline.
			Similar to Bar charts, Lollipop plots visualize numerical comparisons across multiple categories. In a vertical
			lollipop plot, categories are placed on the x-axis, and the y-axis presents the numeric variable. The length of each
			line presents the value of its corresponding category.
		</p>
	),
	whenToUse: (
		<span>
			When to Use—Lollipops are used best to visualize categorical data when there are too many categories with similar
			values. Using a bar chart instead can become cluttery and difficult to read. The dot at the end of each line in
			lollipop plots improves the plot's readability in data-dense plots by highlighting the values and helping readers map
			each category to its value. Also, Lollipop charts are often used to display ranked data and can be useful for
			comparing the relative sizes or colors of different data points. They can effectively highlight changes over time or
			compare the same data points across different categories.
		</span>
	),
	example: (
		<span>
			Example—The following Lollipop plot displays the{' '}
			<a href='https://www23.statcan.gc.ca/imdb/p2SV.pl?Function=getSurvey&SDDS=3226' target='_blank' rel='noreferrer'>
				Canadian Community Health Survey (CCHS)
			</a>{' '}
			is a cross-sectional survey that collects information related to health status, health care utilization, and health
			determinants for the Canadian population. CCHS is a national survey conducted by Statistics Canada to gather
			information about Canadians' health and behaviors. The survey provides information at the national, provincial, and
			local levels. CCHS covers a wide range of health-related topics, including self-reported health status, chronic
			conditions, health care utilization, health behaviors, and social determinants of health. We use this dataset to show
			the data value for each combination of year, location, sex, and age range using Lollipop visualization in Python, R,
			and Tableau. The length of each lollipop represents the data value.
		</span>
	),
};
