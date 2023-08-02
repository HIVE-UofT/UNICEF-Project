import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/violin.svg';
import Part1 from './Part1';
import Part2_3 from './Part2_3';
import Part4 from './Part4';

const Violin = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Part1 />
			<Part2_3 />
			<Part4 />
		</Lecture>
	);
};

export default Violin;

const data = {
	title: 'Violin Plot',
	subtitle: 'A Variation of Box Plots with a better indication of the shape of the distributi!',
	description: (
		<p>
			Violin plots are a popular alternative to traditional box plots and offer a more comprehensive visualization of the
			distribution of data. The plot contains both the box plot in the center and a kernel density plot on either side. The
			box plot displays the five-number summary, which consists of the minimum, first quartile, median, third quartile, and
			maximum of the data. The kernel density plot displays the probability of observing a certain value in the data set.
			The width of the violin plot represents the frequency of the values, with wider sections indicating higher frequency
			and skinnier sections indicating lower frequency
		</p>
	),
	whenToUse: (
		<span>
			The violin plot is a powerful visualization tool that combines the insights of a box plot and a density trace to
			provide a comprehensive view of the statistical properties and shape of a data distribution. The density portion of
			the plot can effectively highlight any clusters or deviations in the data, making it an ideal choice when
			investigating the underlying structure of the data. However, it is important to use caution when comparing categories
			with varying sample sizes as the resulting violin plot may be misleading. The density portion of the plot can be
			skewed by differences in sample size, making it difficult to accurately compare the distributions of different
			categories. To avoid this issue, it is best to use violin plots when comparing categories with similar sample sizes,
			or to consider other visualization methods when comparing categories with significantly different sample sizes.tions,
			it may be more suitable to use a visualization that is less affected by outliers, such as a violin plot.
		</span>
	),
	example: (
		<span>
			The following violin plots illustrate the response of students from various countries to the question, "Are you on a
			diet to lose weight?" The data is provided by
			<a
				href='https://open.canada.ca/data/en/dataset/f725be4e-cec4-41b4-ad58-87ceb1328f88'
				target='_blank'
				rel='noreferrer'>
				Statistics Canada
			</a>{' '}
			and has been stratified by sex and age group.
		</span>
	),
};
