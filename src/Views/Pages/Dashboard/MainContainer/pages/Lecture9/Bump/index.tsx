import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/bump.svg';
import Chart from './Chart';

const Bump = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Bump;

const data = {
	title: 'Bump Chart',
	subtitle: 'A Presentation of Ranks over Time/Stages!',
	description: (
		<p>
			CA Bump chart is a useful variation of a line plot that enables the representation of the relative ranking of
			different categories or objects over time, or through various stages of a process. The Bump chart comprises multiple
			rows, each of which presents the rank of a particular category or object, with the top row being the highest ranked.
			The number of rows in the chart is equivalent to the number of unique categories in the data set. To provide better
			clarity, each category is distinguished by a unique color code, allowing for easy identification and tracking of each
			category's rank over time. These categories are listed on the left-most column of the chart in order of their rank,
			with the highest-ranked category at the top. This technique provides an excellent way to visualize the fluctuation in
			ranking among various categories over time, making it a popular choice for data analysts and decision-makers alike.
		</p>
	),
	whenToUse: (
		<span>
			Bump charts are an excellent tool for exploring changes in rank among different categories, making them a great choice
			for data analysis. They allow for easy comparison of the relative position of each category over time or through
			different stages of a process. However, bump charts do not provide information on the actual value of each category or
			the magnitude of differences between them. The equal vertical distance between the rows in a bump chart only indicates
			the relative rank of each category, and not the degree of difference between them. While bump charts may not be
			suitable for analyzing absolute values or differences, they can be highly effective in visualizing changes in rank
			over time. By highlighting the relative changes in position among different categories, bump charts can help identify
			trends and patterns that may be obscured by other types of charts.
		</span>
	),
	example: (
		<span>
			The aggregated data in the following Bump present number of COVID-19 deaths since the start of the pandemic to today
			in the USA, subdivided by states (
			<a href='https://data.cdc.gov/api/views/r8kw-7aab/rows.csv?accessType=DOWNLOAD' target='_blank' rel='noreferrer'>
				Data Source
			</a>
			).
		</span>
	),
};
