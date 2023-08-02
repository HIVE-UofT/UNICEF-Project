import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/likert.jpg';
import Chart from './Chart';

const Likert = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Likert;

const data = {
	title: 'Likert Chart',
	subtitle: 'A Stacked Bar Chart to Show Ordinal Data!',
	description: (
		<p>
			A Likert chart (also known as a Likert plot) is a type of data visualization used to display responses to survey
			questions that employ a Likert scale. A Likert scale is an ordinal scale typically consisting of 5 or 7 response
			options, which range from one extreme (e.g., "Strongly Disagree") to the other (e.g., "Strongly Agree"), with a
			neutral option in the middle (e.g., "Neutral" or "Neither Agree nor Disagree"). Likert charts help to identify
			patterns, trends, and the distribution of responses across various survey questions. They display the percentage or
			count of responses in each category, usually by stacking bars horizontally or vertically, making it easy to compare
			the overall sentiment or agreement levels for different questions or groups. By stacking bars horizontally or
			vertically to represent response percentages or counts, Likert charts enable easy comparison of sentiment or agreement
			levels across questions or groups. This visualization assists in identifying areas of consensus or disagreement and
			evaluating the effectiveness of health communication strategies or interventions. Likert charts are an important tool
			for understanding human behavior and making data-driven decisions in public health.
		</p>
	),
	whenToUse: (
		<span>
			A Likert plot is a way of visualizing survey responses to questions that use a Likert scale. However, it may not be
			the best choice in some situations. For example, if your sample size is small, a Likert plot may not provide reliable
			results. Additionally, if the responses to your survey question are highly skewed or if there are extreme outliers, a
			different type of plot may be more appropriate. Finally, if you are interested in exploring the relationship between
			multiple variables, a Likert plot may not be the most effective way to do so. In such cases, it may be better to
			consider using a different type of plot or visualization.
		</span>
	),
	example: (
		<span>
			The following Likert plots present the results of{' '}
			<a href='https://insights.infoway-inforoute.ca/data_table_2021' target='_blank' rel='noreferrer'>
				2021 CANADIAN DIGITAL HEALTH SURVEY
			</a>{' '}
			, provided by Canada Health Infoway. This dataset is a valuable resource for exploring Canadians' experiences with
			digital health. In this tutorial, we will visualize the results of one of the questions, and encourage you to explore
			the rest of the questions on your own.
		</span>
	),
};
