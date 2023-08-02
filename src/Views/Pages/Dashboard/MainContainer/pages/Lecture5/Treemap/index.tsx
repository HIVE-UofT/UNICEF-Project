import Lecture from '@src/Components/Lecture/Lecture';
import anatomy from '@assets/Images/dashboard/anatomies/treemap.svg';
import ChartPython from './ChartPython';
import ChartR from './ChartR';

const Treemap = () => {
	return (
		<Lecture data={data} anatomy={anatomy}>
			<ChartPython />
			<ChartR />
		</Lecture>
	);
};

export default Treemap;

const data = {
	title: 'Treemap Visualization',
	subtitle: 'Presentation of the hierarchical distribution of data!',
	description: (
		<p>
			Treemaps are a dynamic way to showcase hierarchical data structures using nested rectangles of varying sizes. The size
			of each rectangle corresponds to the value of the data it displays, making treemaps an excellent tool for comparing
			the proportionality of different subcategories within a larger dataset. In a treemap, the data is organized into
			different levels, or layers, and the size of the rectangles reflects the magnitude of the data at each level, enabling
			viewers to easily identify patterns and relationships within the data. Color differentiation of the main branches of
			the hierarchy further assists in understanding the data's structure and comparing subcategories.
		</p>
	),
	whenToUse: (
		<span>
			Treemaps are often utilized in scenarios where hierarchical data structures need to be visualized and analyzed in
			terms of proportionality between categories. The compact form of treemaps makes them a suitable choice for presenting
			large-scale hierarchical data, providing a quick overview of each subcategory's contribution to the overall dataset.
			They are particularly effective when a large dataset needs to be condensed into a compact and easily understandable
			representation. However, their design may not be suitable for precise comparisons in cases where the hierarchical data
			is well balanced. Additionally, treemaps are limited to representing positive values only, making them inappropriate
			for comparisons that involve both positive and negative values, such as gain/loss visualizations. Treemaps can be used
			to display large datasets in EHR and public health, showing the distribution of disease cases and effectiveness of
			treatments, as well as the geographical distribution of healthcare resources.
		</span>
	),
	example: (
		<span>
			The following treemap illustrates the hierarchical distribution of health conditions and factors that contribute to
			deaths related to COVID-19, classified by age group in the United States (
			<a href='https://www.cdc.gov/nchs/nvss/vsrr/covid_weekly/index.htm' target='_blank' rel='noreferrer'>
				Data Source
			</a>
			).
		</span>
	),
};
