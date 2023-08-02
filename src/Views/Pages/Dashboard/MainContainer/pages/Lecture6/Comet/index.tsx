import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/comet.jpg';
import ChartPython from './ChartPython';

const Comet = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
		</Lecture>
	);
};

export default Comet;

const data = {
	title: 'Comet Chart',
	subtitle: 'Illustrate the changes between then and now!',
	description: (
		<p>
			A Comet chart is an effective way to visually represent changes in grouped data over time. This visualization
			technique utilizes various variables such as position, size, and color to map out different categories, the volume of
			change, and whether the change is positive or negative, respectively. Each comet represents one observation, and the
			head of the comet denotes the most recent observation. Additionally, a third variable can be added to further
			categorize the data. As illustrated in the anatomy of this visualization technique, we can visualize changes over time
			for nested categories, with categories listed on the y-axis and subcategories dividing the visualization into several
			components. In this anatomy, we have three components, which is similar to the facet feature in the ggplot library in
			R.
		</p>
	),
	whenToUse: (
		<span>
			The Comet chart is a useful tool for quickly and easily identifying patterns and trends within large sets of data. The
			chart's use of color and size variables can help to identify the direction and magnitude of changes simultaneously,
			making it an ideal technique for comparisons among categories and nested categories. However, it is important to keep
			in mind that Comet charts are best suited for identifying trends and patterns, rather than precise comparisons between
			entities or categories. For precise comparisons, a bar/line chart or table may be a more suitable option.
			Additionally, it is essential to ensure that the data for different categories listed on the chart are normalized and
			have the same units. Otherwise, the use of size variable in this technique may become misleading.
		</span>
	),
	example: (
		<span>
			To create a comet chart, we use the implementation of the chart in the Altair library, which was inspired by{' '}
			<a href='https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD' target='_blank' rel='noreferrer'>
				Zan Armstrong’s comet chart
			</a>
			. After creating the chart, it can be exported as an HTML file and included as a URL in your dashboard. In the example
			below, we utilized this technique to visualize the percentage of Canadians experiencing suicidal thoughts by age and
			province. The data used for this visualization is provided by Statistics Canada and was collected through surveys
			conducted in 2015 and 2019.
		</span>
	),
};
