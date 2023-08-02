import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/pack.jpg';
import Chart from './Chart';

const PackedCircle = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default PackedCircle;

const data = {
	title: 'Packed Circle Chart',
	subtitle: 'Simplified Hierarchical Data Visualization with a Compact Presentation!',
	description: (
		<p>
			Packed Circle visualization is a technique for displaying hierarchical data using nested circles. Each circle
			represents a level of the hierarchy and its size corresponds to the data magnitude at that level. By packing the
			circles closely together, the relationships between data elements are visually conveyed. In interactive versions of
			the chart, users can zoom in or out to focus on subcategories.
		</p>
	),
	whenToUse: (
		<span>
			Circle pack visualizations are a valuable tool for displaying public health data or EHRs that involves multiple
			variables and distinct data points. They are particularly effective in highlighting the relative magnitudes of the
			data points, as the size of the circles can easily emphasize the largest and smallest values. This type of
			visualization is commonly used to display public health data related to disease prevalence, health outcomes,
			demographic information, and distribution of risk factors. However, as the number of levels in a hierarchical dataset
			increases, lower levels may become difficult to discern or their labels may become illegible. For deeper hierarchies,
			a collapsible tree or a sunburst visualization may be more effective alternatives.
		</span>
	),
	example: (
		<span>
			The following treemap illustrates the hierarchical distribution of health conditions and factors that contribute to
			deaths related to COVID-19, classified by age group in the United States (
			<a href='https://www.cdc.gov/nchs/nvss/vsrr/covid_weekly/index.htm' target='_blank' rel='noreferrer'>
				Data Source
			</a>
			).
		</span>
	),
};
