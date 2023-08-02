import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/funnel.svg';
import Chart from './Chart';

const Funnel = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Funnel;

const data = {
	title: 'Funnel Chart',
	subtitle: 'An alternative for (stacked) barchart!',
	description: (
		<p>
			As its name implies, a Funnel chart presents the values of a variable in progressively increasing or decreasing
			proportions. The evenly spaced segments on the vertical axis present different categories of data, where the category
			with the highest value is placed on the top, followed by the second-largest category and the smaller categories are
			placed in the neck. The funnel slops that connect different segments of the chart show the magnitude of drop-offs
			between different categories. Funnel charts are best used as a high-level presentation of ordinal data when you have
			at least three categories (stages) to compare. Part-to-whole visualization techniques such as pie-chart or stacked bar
			charts can be used for variables with only two categories instead. As a Funnel chart is a center-aligned bar chart
			with bars stacked vertically, a sorted bar chart can always be an apt alternative for this technique.
		</p>
	),
	whenToUse: (
		<span>
			While both stacked bar charts and pie charts can effectively display a part-to-whole breakdown similar to a funnel
			chart, they might not always clearly differentiate the values of different categories. In situations where
			understanding the ordinal nature of a dataset is crucial, a funnel chart serves as a better visual representation.
			However, keep in mind that funnel charts primarily offer an overview of a process or ranking, and are not designed for
			making precise comparisons between stages or categories. If your goal is to compare exact values or perform detailed
			analysis, consider using other chart types like bar or line charts. Furthermore, if your data is time-based and you
			need to visualize trends or changes over time, funnel charts may not be the best choice. In such cases, line charts,
			area charts, or bar charts might be more suitable options.
		</span>
	),
	example: (
		<span>
			The following funnel chart presents the ranking of{' '}
			<a
				href='https://data.cdc.gov/NCHS/Conditions-Contributing-to-COVID-19-Deaths-by-Stat/hk9y-quqm'
				target='_blank'
				rel='noreferrer'>
				conditions contributing to COVID-19 deaths
			</a>
			. In this example, we are using a funnel chart to display the ranking of categories. However, it is important to note
			that funnel charts are typically used to visualize stages in a process and to illustrate how data flows through each
			stage.
		</span>
	),
};
