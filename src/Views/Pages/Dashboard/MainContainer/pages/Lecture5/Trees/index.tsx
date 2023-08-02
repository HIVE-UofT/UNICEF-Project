import Chart from './Chart';
import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/tree.jpg';

const Tree = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Tree;

const data = {
	title: 'Collapsible Trees',
	subtitle: 'A Dynamic Structure to Efficiently Navigate Hierarchical Data!',
	description: (
		<p>
			A collapsible tree visualization is a type of data presentation that represents hierarchical relationships between
			elements in a tree-like structure. Nodes in the tree can be collapsed or expanded to show or hide more information
			about the data. It is typically used to represent large and complex hierarchical data in a compact and organized
			manner.
		</p>
	),
	whenToUse: (
		<span>
			Collapsible tree visualizations offer a convenient method for displaying and examining hierarchical connections among
			data elements. The ability to expand and collapse various levels of hierarchy provides a clear and structured view of
			the relationships. This makes these visualizations particularly useful for comprehending complex data sets in the
			public health sector. In the field of public health, it is vital to comprehend the relationships between various data
			components such as illnesses, risk factors, demographic information, and health outcomes. Collapsible tree
			visualizations can assist in this effort by enabling public health professionals to promptly recognize patterns and
			relationships that may not be easily noticeable in conventional tabular data representations.
		</span>
	),
	example: (
		<span>
			The following collapsible tree illustrates the hierarchical distribution of health conditions and factors that
			contribute to deaths related to COVID-19, classified by age group in the United States (
			<a href='https://www.cdc.gov/nchs/nvss/vsrr/covid_weekly/index.htm' target='_blank' rel='noreferrer'>
				Data Source
			</a>
			).
		</span>
	),
};
