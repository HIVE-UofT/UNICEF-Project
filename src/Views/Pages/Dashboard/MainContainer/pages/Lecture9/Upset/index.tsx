import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/upset.svg';
import Chart from './Chart';

const Upset = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<Chart />
		</Lecture>
	);
};

export default Upset;

const data = {
	title: 'Upset Plot',
	subtitle: 'Visualization of Intersecting Sets!',
	description: (
		<p>
			An UpSet plot offers an efficient method for visualizing the intersections of multiple sets compared to traditional
			approaches, such as Venn diagrams. In an UpSet plot, the lower portion represents all possible intersections, while
			the occurrence of each intersection is displayed in the upper bar plot. To create an UpSet plot, a binary matrix must
			be generated, with columns representing sets and rows representing elements. For instance, for sets A, B, and C, a row
			labeled 001 indicates that the element is present only in sets B and C. The lower portion of the UpSet plot displays
			possible intersections by connecting intersecting sets, while the upper bar chart depicts the size of these
			intersections. Additionally, the left component illustrates the size of each individual set.
		</p>
	),
	whenToUse: (
		<span>
			Upset plots are best used when you need to visualize the intersections and relationships among multiple sets,
			particularly when comparing the size and overlap of these sets. They are particularly helpful for analyzing complex
			datasets with numerous intersections and understanding shared elements between different groups. When dealing with a
			large number of intersecting groups, upset plots may become extensive and difficult to comprehend; in such cases,
			filtering the sets to concentrate on the most relevant intersections can enhance clarity and understanding.
		</span>
	),
	example: (
		<span>
			The following upset plot visualizes the prevalence of various health indicators in Canada, as determined by the{' '}
			<a href='https://physionet.org/content/eicu-crd/2.0/' target='_blank' rel='noreferrer'>
				Public Health Agency of Canada's annual surveys
			</a>
			.We filter the data based on a specific threshold of percentage of Canadians with each indicator, such as diabetes or
			high blood pressure, and identify provinces and their intersections that exhibit these shared health characteristics.
		</span>
	),
};
