import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/sankey.svg';
import ChartPython from './ChartPython';
import ChartR from './ChartR';

const Sankey = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
			<ChartR />
		</Lecture>
	);
};

export default Sankey;

const data = {
	title: 'Sankey Diagram',
	subtitle: 'Presentation of data flow using smooth links!',
	description: (
		<p>
			A Sankey diagram is a useful technique for displaying the flow of data between different categories. The connections
			between the categories are represented by links that are sized proportionally to the value of each connection, such as
			frequency or quantity. In addition, each lane in the diagram presents a stacked bar chart with extra space between
			categories, which allows for clear visualization of the constituent categories of each stage. In public health, Sankey
			diagrams can be used to visualize the flow of patients through different stages of care, such as hospital admissions,
			diagnoses, treatments, and outcomes. This can help healthcare providers and policymakers identify bottlenecks and
			inefficiencies in the healthcare system, and develop strategies to improve patient care and outcomes. Sankey diagrams
			can also be used to track the spread of infectious diseases and identify potential sources of transmission, as well as
			to visualize the impact of public health interventions and policies on health outcomes. Overall, Sankey diagrams are a
			useful tool for analyzing and communicating complex data in public health and healthcare.
		</p>
	),
	whenToUse: (
		<span>
			Sankey diagrams are effective in displaying the quantitative flow of data, highlighting significant flows, and the
			contribution of each category to different stages of a process. However, if the number of entities and their
			connections is too high, the diagram can become over-cluttered, reducing legibility. In such cases, it is best to
			avoid using Sankey diagrams. To address this issue, interactive implementation of this technique enables users to
			filter the value of connecting links and categories. However, if entities remain the same over time, other techniques
			such as Stacked Area chart or Funnel Chart may be more suitable for the task. Stacked Area chart presents the size of
			connection over time, while a Funnel Chart shows the value of the relationships through the size of each bar.
		</span>
	),
	example: (
		<span>
			In the example below, we use a Sankey diagram to illustrate the sequence of treatments for various health issues. Each
			lane represents a stage of the treatment, with the first lane depicting the initial health conditions. The thickness
			of each flow corresponds to the frequency of its respective (source, target) pair.
		</span>
	),
};
