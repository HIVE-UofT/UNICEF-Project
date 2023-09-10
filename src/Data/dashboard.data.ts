import Size from '@assets/Images/dashboard/home/size.png';
import Color from '@assets/Images/dashboard/home/color.png';
import Position from '@assets/Images/dashboard/home/position.png';
import Direction from '@assets/Images/dashboard/home/direction.png';
import Saturation from '@assets/Images/dashboard/home/saturation.png';
import { ReactComponent as NLP } from '@assets/icons/dashboard/sidebar/nlp.svg';
import { ReactComponent as Home } from '@assets/icons/dashboard/sidebar/home.svg';
import { ReactComponent as Wrench } from '../Assets/icons/dashboard/sidebar/wrench.svg';
import { ReactComponent as Brain } from '../Assets/icons/dashboard/sidebar/brain-solid.svg';
import { ReactComponent as Survey } from '../Assets/icons/dashboard/sidebar/survey.svg';
import { ReactComponent as Story } from '@assets/icons/dashboard/sidebar/storyboard.svg';
import { ReactComponent as Comparison } from '@assets/icons/dashboard/sidebar/comparison.svg';
import { ReactComponent as Temporal } from '@assets/icons/dashboard/sidebar/temporal.svg';
import { ReactComponent as Numerical } from '@assets/icons/dashboard/sidebar/numerical.svg';
import { ReactComponent as Categories } from '@assets/icons/dashboard/sidebar/categories.svg';
import { ReactComponent as Geospatial } from '@assets/icons/dashboard/sidebar/geospatial.svg';
import { ReactComponent as Categorical } from '@assets/icons/dashboard/sidebar/categorical.svg';

export const sidebar_menu = [
	{
		key: 'home',
		title: 'Home',
		icon: Home,
	},
	{
		key: 'L1',
		title: 'Introduction to Machine Learning',
		icon: Brain,
		items: ['Machine Learning Tasks', 'Python Basics', 'Python Practical Application'],
		roles: ['INTRO_TO_ML'],
	},
	// {
	// 	key: 'L2',
	// 	title: 'Categorical Data',
	// 	icon: Categorical,
	// 	items: ['Bar', 'Bubble', 'Pie (Donut)', 'Tile', 'Tableau Tutorial'],
	// 	roles: ['CATEGORICAL_DATA'],
	// },
	// {
	// 	key: 'L3',
	// 	title: 'Natural Language - Processing',
	// 	items: ['Sentiment Analysis - and n-grams', 'Topic Modeling'],
	// 	icon: NLP,
	// 	roles: ['NLP'],
	// },
	// {
	// 	key: 'L4',
	// 	title: 'Numerical Data',
	// 	items: ['Box', 'Violin'],
	// 	icon: Numerical,
	// 	roles: ['NUMERICAL_DATA'],
	// },
	// {
	// 	key: 'L5',
	// 	title: 'Hierarchical Data',
	// 	items: ['Trees', 'Sunburst', 'Packed circles', 'Treemap'],
	// 	icon: Categories,
	// 	roles: ['HIERARCHICAL_DATA'],
	// },
	// {
	// 	key: 'L6',
	// 	title: 'Temporal and - Ordinal Data',
	// 	items: ['Area', 'Comet', 'Sankey', 'Sparkline', 'Stream'],
	// 	roles: ['TEMPORAL_AND_ORDINAL_DATA'],
	// 	icon: Temporal,
	// },
	// {
	// 	key: 'L7',
	// 	title: 'Visual Story Telling',
	// 	items: ['Story1 - Lives Lost to Suicide', 'Story2 - Suicidal Thoughts', 'Story3 - Cannabis Use'],
	// 	roles: ['VISUAL_STORY_TELLING'],
	// 	icon: Story,
	// },
	// {
	// 	key: 'L8',
	// 	title: 'Geospatial Data',
	// 	roles: ['GEOSPATIAL_DATA'],
	// 	items: ['Choropleth', 'Tableau Tutorial (Bubble & Choropleth Maps)'],
	// 	icon: Geospatial,
	// },
	// {
	// 	key: 'L9',
	// 	roles: ['VISUALIZE_COMPARISONS'],
	// 	title: 'Visualize Comparisons',
	// 	items: ['Bump', 'Chord', 'Funnel', 'Parallel Coordinates', 'Upset'],
	// 	icon: Comparison,
	// },
	// {
	// 	key: 'L10',
	// 	roles: ['SURVEY_DATA'],
	// 	title: 'Survey Data',
	// 	items: ['Likert'],
	// 	icon: Survey,
	// },
];

export const home_data = {
	header: {
		title: 'Health Data Visualization',
		description:
			'This course is intended to expose students to various visual representation techniques and tools and offers them the opportunity to learn how to successfully transform different data types and structures into compelling and interactive visual reports with the purpose of promoting informed decisions and engendering a clear and shared understanding. In this course, students will learn about design principles and become familiar with exploratory and explanatory data visualization techniques to accurately distill complex datasets into coherent and informative insights for audiences with varying levels of data literacy. The class will also focus on critical thinking, problem-solving, and sound analysis practices to avoid cognitive biases when designing, thinking, analyzing, and making decisions based on data. The course materials, in-class datathons, and the course project are designed in the context of real-world application.',
	},
	content: {
		title: 'Exploratory Visualization of Ehr and Population Data',
		description: 'Pattern discovery using interactive visualizations',
		cards: [
			{
				image: Position,
				title: 'Position',
				subtitle: 'X.Y Locations',
				data: ['Categorical', 'Temporal', 'Numerical', 'Geospatial'],
				chart: ['Bubble Chart', 'Location Map', 'Scatter Plot'],
			},
			{
				image: Size,
				title: 'Size',
				subtitle: 'Lengtharea',
				data: ['Numerical'],
				chart: ['Bar Graph', 'Pie/Donut Chart', 'Treamap', 'Area Chart'],
			},
			{
				image: Color,
				title: 'Color',
				subtitle: 'Changes in Hue',
				data: ['Categorical'],
				chart: ['Bar Graph', 'Stream Graph', 'Radar Chart', 'Location Map'],
			},
			{
				image: Direction,
				title: 'Direction',
				subtitle: 'Alignment',
				data: ['Categorical'],
				chart: ['Line Plot', 'Stream Graph', 'Area Chart'],
			},
			{
				image: Saturation,
				title: 'Saturation',
				subtitle: 'Color Value',
				data: ['Temporal', 'Numerical'],
				chart: ['Area Map', 'Calander'],
			},
		],
	},
};
