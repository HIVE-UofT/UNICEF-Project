import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/boxplot.svg';
import ChartPython from './ChartPython';
import ChartR from './ChartR';

const Box = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
			<ChartR />
		</Lecture>
	);
};

export default Box;

const data = {
	title: 'Box Plot',
	subtitle: 'A Visual Presentation of the Five-number Summary!',
	description: (
		<p>
			BA Box Plot, also known as a Whisker Plot or a Box and Whisker Plot, is a graphical representation of a dataset's
			distribution. The plot uses different quartiles to illustrate the distribution of the data. The horizontal line that
			cuts through the box indicates the median of the dataset, which represents the middle of the data. When the median is
			roughly placed in the middle of the chart, the data is considered to be symmetrical. However, if the median divides
			the box into two unequal sections, it indicates that the data is skewed to the right if the right section is longer,
			and to the left if the opposite is true. It is important to note that a longer section does not mean that there is
			more data in that section, but rather that the values in that quartile cover a wider range of values and the data is
			less condensed. A Box Plot provides a quick overview of the percentile distribution of the data, but it does not give
			any information about the size of the dataset in each quartile. Each section of the plot represents 25% of the data,
			regardless of its distribution:
			<ul className='my-2 ml-4' style={{ listStyle: 'disc inside none' }}>
				<li className='font-bold list-item'>Minumum value to First Quartile (Q1 or 25th Percentile)</li>
				<li className='font-bold'>Lower Quartile to Median (Q2 or 50th Percentile)</li>
				<li className='font-bold'>Median to Upper Quartile</li>
				<li className='font-bold'>Upper Quartile to Maximum</li>
			</ul>
			The length of the box in a Box Plot represents the Interquartile Range (IQR), which encompasses 50% of the data,
			specifically the values that fall between the 25th and 75th percentiles. In addition, the lines that extend outside
			the box are referred to as "whiskers." These whiskers connect the upper and lower quartiles to the maximum and minimum
			values of the dataset, respectively. The whiskers give an idea of how spread out the data is beyond the IQR. It's
			important to note that the IQR is a measure of the variability of the data within the middle 50% of the dataset, while
			the whiskers give a sense of the variability of the data in the entire dataset.
		</p>
	),
	whenToUse: (
		<span>
			Box Plots are particularly useful in the comparison of data across multiple categories. They provide a quick and
			effective way of understanding the diversity of values in a dataset, and they are an excellent tool for detecting
			outliers or skewness in data. However, when dealing with data from a single category, a histogram may be a more
			suitable option for presenting the distribution of the data. This is because a Box Plot provides limited information
			about the full distribution of the data and does not give any insight into the shape of the data. A histogram, on the
			other hand, provides a more complete representation of the distribution by showing the frequency of data points within
			specified intervals. Box Plots are impacted by the presence of outliers, and if a dataset contains extreme outliers,
			the visualization can be skewed and not accurately reflect the actual data. In these situations, it may be more
			suitable to use a visualization that is less affected by outliers, such as a violin plot.
		</span>
	),
	example: (
		<span>
			The following violin plots illustrate the response of students from various countries to the question, "Are you on a
			diet to lose weight?" The data is provided by{' '}
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
