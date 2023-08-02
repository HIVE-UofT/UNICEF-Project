import anatomy from '@assets/Images/dashboard/anatomies/bar.svg';
import Lecture from '@src/Components/Lecture/Lecture';
import ChartR from './ChartR';

const Bar = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartR />
		</Lecture>
	);
};

export default Bar;

const data = {
	title: 'Bar Graph/Chart',
	subtitle: 'Visual presentation of categorical data (comparisons/trends over time)',
	description: (
		<p>
			A bar graph is one of the most common ways to explore and present data classified into nominal (categories) or ordinal
			(temporal) types. As illustrated below, a bar graph has two axes; one axis represents quantitative data, and the other
			presents the categories being compared. In a bar chart, each data category claims one bar, and the length/size of the
			bars corresponds to the category’s value. To show more classification levels for the categorical data, we can use the
			colour variable and present a nested categorical classification on the category axis. For example, in the following
			bar charts, we first classify the data based on the Age-group of the Canadians and then use colour to organize each
			age group based on the gender of the population that it presents.
		</p>
	),
	whenToUse: (
		<span>
			A Bar chart is best used when you have categorical data (data that can be divided into separate groups or categories)
			and you want to show how different categories compare in terms of size or amount. Additionally, bar charts can be used
			to represent data over time or to compare data between different groups or categories. A bar chart may not be the best
			choice for certain types of data or in certain situations. For example, when the data is continuous and not
			categorical, or when the data has a large number of categories or groups, a bar chart can become cluttered and
			difficult to read. Moreover, when the difference between the values of the categories or groups is small, a bar chart
			may not effectively show these differences. When choosing a chart or graph, it is always important to consider the
			type of data and the message you want to communicate.
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
			we use in this handout is published by Statistics Canada and describes the proportion of the population with one or
			more underlying health conditions that are believed to increase the risk of negative outcomes following COVID-19
			infection, including hospitalization and death. Estimates are based on data from the 2017-2018 Canadian Community
			Health Survey, and are provided for the Canadian adult (age 18 and older) population by select demographic and
			socio-economic characteristics at the national and provincial/territorial level.
		</span>
	),
};
