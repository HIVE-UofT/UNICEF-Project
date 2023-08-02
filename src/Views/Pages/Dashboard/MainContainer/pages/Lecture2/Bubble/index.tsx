import anatomy from '@assets/Images/dashboard/anatomies/bubble.svg';
import Lecture from '@src/Components/Lecture/Lecture';
import ChartPython from './ChartPython';
import ChartR from './ChartR';

const Bubble = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartR />
			<ChartPython />
		</Lecture>
	);
};

export default Bubble;

const data = {
	title: 'Bubble Chart',
	subtitle: 'A Scatter Plot for Categorical Data!',
	description: (
		<p>
			A bubble chart is a variation of scatter plots that can be used to visualize the quantitative relationships between
			two categorical variables. Each bubble presents a numeric variable for a pair of categorical variables (A, B), placed
			on a cartesian coordinate and sized proportionally to the value of each relationship.
		</p>
	),
	whenToUse: (
		<span>
			Bubble charts are mainly useful for presenting the relationships between categorical variables. However, they can
			become hard to interpret when the quantitative variable does not have enough variability, making it very hard for the
			eyes to distinguish the relative size between different values. Labeling each bubble with the value in this scenario
			may help with more accurate comparisons. Bubble charts can also be used to visualize triplets of linked quantitative
			data elements per observation, where the size of each circle presents a third variable. However, a bubble chart cannot
			be used for triplet relationships if the third variable contains zero or negative values.
		</span>
	),
	example: (
		<span>
			The{' '}
			<a
				href='https://open.canada.ca/data/en/dataset/153df6d8-0024-4f29-acb1-b0c960013fe7'
				target='_blank'
				rel='noreferrer'>
				dataset
			</a>{' '}
			that we use to generate the following bar charts is published by Statistics Canada and describes the proportion of the
			population with one or more underlying health conditions that are believed to increase the risk of negative outcomes
			following COVID-19 infection, including hospitalization and death. Estimates are based on data from the 2017-2018
			Canadian Community Health Survey, and are provided for the Canadian adult (age 18 and older) population by select
			demographic and socio-economic characteristics at the national and provincial/territorial level.
		</span>
	),
};
