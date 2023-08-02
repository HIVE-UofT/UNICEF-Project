import Chart from './Chart';
import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/pie.svg';

const Pie = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Pie;

const data = {
	title: 'Pie (Donut) Chart',
	subtitle: 'Presentation of the proportional distribution of data!',
	description: (
		<p>
			A Pie chart presents a <strong>part-to-whole</strong> relationship, where each slice presents one category of your
			data. It is best practice to use this visualization when you have a limited number of categories. Having too many
			skinny segments in the chart makes it very hard for the eyes to distinguish the relativity of size between each
			category.
		</p>
	),
	whenToUse: (
		<span>
			We use a pie chart when we want to compare the parts of a whole, and the number of categories is not too large. Donut
			charts can be used in the same way as pie charts, but they are better suited when we want to emphasize the{' '}
			<strong>center</strong> of the chart and de-emphasize the edges. Pie or donut charts are not recommended for temporal
			comparisons or when you need to explore the distribution of your categorical feature using more than one numerical
			variable. This is because lining up the arc length between different pie charts is hard and highly mistake-prone.
			Also, the area of the slice for a category in one dataset might have a different meaning in another dataset, as it
			only presents the relative fraction of each category. Also, when the number of categories is large (more than 6-7
			categories), pie charts are not a good choice, as it becomes difficult to accurately compare the sizes of the wedges,
			and the chart becomes cluttered. If you want to show exact values, you may want to consider using a different chart
			type, such as a bar chart or a table.
		</span>
	),
	example: (
		<span>
			To generate the following pie (donut) charts, we use a dataset presenting the{' '}
			<a
				href='https://catalog.data.gov/dataset/conditions-contributing-to-deaths-involving-coronavirus-disease-2019-covid-19-by-age-group'
				target='_blank'
				rel='noreferrer'>
				Conditions Contributing to COVID-19 Deaths, by State and Age, Provisional 2020-2023
			</a>
			{'. '}
			This dataset displays the various health issues and factors associated with deaths resulting from coronavirus disease
			2019 (COVID-19) in the US, broken down by age group and location where the death occurred.
		</span>
	),
};
