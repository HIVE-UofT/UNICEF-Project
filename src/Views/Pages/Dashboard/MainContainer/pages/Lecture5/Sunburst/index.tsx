import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/sunburst.jpg';
import Chart from './Chart';

const Sunburst = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Sunburst;

const data = {
	title: 'Sunburst Chart',
	subtitle: 'A Radial presentation of the hierarchical distribution of data!',
	description: (
		<p>
			A sunburst diagram is a circular representation of hierarchical data, where each level of the hierarchy is shown as a
			ring, with the innermost ring being the root of the hierarchy and the outermost ring being the end points. The size of
			each segment in a ring indicates the relative proportion of that category in the hierarchy. This type of visualization
			presents hierarchical data in an organized and easily understandable manner.
		</p>
	),
	whenToUse: (
		<span>
			Sunburst visualizations provide an effective means for representing hierarchical relationships between data elements,
			especially in the field of public health. These circular diagrams help public health professionals understand complex
			data sets by highlighting the hierarchical structure and the relative size of each category within the hierarchy. By
			enabling an easy-to-read and organized view of the relationships, sunburst visualizations can assist in quickly
			identifying patterns and connections between various data elements, such as diseases, risk factors, demographics, and
			health outcomes. However, it is important to be aware of situations where sunburst visualizations may not be
			appropriate. If the data contains a large number of levels or categories, the resulting visualization may become
			overcrowded and difficult to interpret. Similarly, if there is significant overlap or ambiguity in the category
			definitions, the visualization may not provide much insight. In these cases, it is better to consider other
			visualization techniques such as bar charts or scatterplots. It is also worth noting that sunburst visualizations are
			most useful for comparing the relative proportions of categories, rather than their absolute values. If you need to
			compare absolute values, other visualization techniques may be more appropriate.
		</span>
	),
	example: (
		<span>
			The following Sunburst illustrates the hierarchical distribution of number of COVID-19 deaths in the United States,
			stratifies by age and sex (
			<a href='https://data.cdc.gov/api/views/9bhg-hcku/rows.csv?accessType=DOWNLOA' target='_blank' rel='noreferrer'>
				Data Source
			</a>
			).
		</span>
	),
};
