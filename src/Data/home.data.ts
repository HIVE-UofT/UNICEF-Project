import chart_image from '../Assets/Images/home/Banner1.png';
import toronto from '@assets/Images/home/p3.svg';
import dalla from '@assets/Images/home/p4.svg';
import instructor_img from '@assets/Images/home/instructor.svg';
import chart from '@assets/Images/home/statistic-chart.svg';
// import chart1 from '@assets/Images/home/chart1.png';
import chart1 from '@assets/Images/home/chart1-1.png';
import chart2 from '@assets/Images/home/chart2.jpg';
import chart3 from '@assets/Images/home/chart3.jpg';

export const our_vision = {
	section: ' ',
	title: 'DECODING SCHOOL DROPOUT PREDICTION',
	sub_title: ' ',
	description:
		'this project aims to use the Machine Learning technology to predict dropout rate based on various features, including but not limited to health information, \n' +
		'    student demographic and school background, to help different organization to have a handy but reliable dropout systems and  platform.',
};

export const our_chart = [
	{
		section: 'Chord Diagram',
		title: 'Dropout Risk Factors',
		description:
		'This chord diagram visualizes the frequency of co-occurrence between different risk factors. There are 30 risk factors categorized from features extracted in previous studies. The width of the ribbons connecting two risk factors corresponds to the number of countries where those risk factors are used together in building predictive models. By examining the connections between risk factors, we can identify the most significant patterns and correlations that could aid in selecting predictive features.',
		iFrameLink : 'chord_Category_risk.html',
		frameInNewRow: false,
	},
	{
		section: 'Sunburst',
		frameInNewRow: false,
		title: '',
		description:
	'This Sunburst diagram contains the first two levels of the hierarchical structure, revealing the relationships between dimensions and risk factors. Each segment\'s size represents the frequency of its appearance in predictive models, enabling you to identify significant categories quickly.',
		iFrameLink : 'sunburst_FreqCounts_withoutFeature.html',
	},	{
		section: 'Collapsible Tree',
		title: '',
		description:
	'The Collapsible Tree diagram presents an interactive visualization of feature categorization for predicting student school dropout. The features are grouped into 30 distinct risk factors, and these 30 risk factors are further categorized into 9 comprehensive dimensions. Each feature node displays its frequency of appearance in previous school dropout models, allowing you to identify crucial predictors. You can explore the features by selecting the dimensions and risk factors you are interested in.',
		iFrameLink : 'collapsibleTree_FreqCounts.html',
		frameInNewRow: true,
	},{
		section: 'Interactive Treemap',
		title: '',
		frameInNewRow: true,
		description:
'The Treemap visualization showcases three hierarchical levels while displaying one level at a time. By clicking on a rectangle, you can delve deeper into lower-level categories, gaining a better understanding of their hierarchical relationships. The size of each rectangle corresponds to the frequency of its appearance in predictive models, enabling effortless comparisons of feature usage.',
		iFrameLink : 'interactive_treemap.html',
	},{
		section: 'Treemap',
		title: '',
		frameInNewRow: true ,
		description:
		'Unlike the previous interactive Treemap, this graph showcases all three hierarchical levels simultaneously, providing a comprehensive overview of the relationships between features, risks, and dimensions. The size of each rectangle corresponds to the frequency of its appearance in predictive models. The colour palette further enhances the visualization. By hovering over the rectangles, you can access additional information, such as the specific count for each feature.',
			iFrameLink : 'treeMap.html',
	},

];

export const instructor = {
	title: 'Collaborators',
	people : [
		{
			name: 'Zahra Shakeri',
			image: 'https://hivelab-uoft.ca/images/team/zahra.jpg',
			description: 'Supervisor',
		},{
			name: 'Ziqi Shu',
			image: 'https://hivelab-uoft.ca/images/team/ziqi_shu.jpeg',
			description: 'Creator',
		}
		,{
			name: 'Jiayu Liangm',
			image: 'https://hivelab-uoft.ca/images/team/Grace.JPG',
			description: 'Creator',
		},{
			name: 'Yong Chen',
			image: 'https://hivelab-uoft.ca/images/team/yong.png',
			description: 'Creator',
		}

	],
	logos: [toronto, dalla],
};

export const contact_us = {
	section: 'Get in Touch!',
	description: `Want to know more or collaborate?
	Get in touch with us below and be part of our data-driven storytelling team. 
	`,
	dropdownList: [
		'Providing Feedback',
		'Interested to Collaborate',
		'Need to Access the Course (Select if you are registered for the course)',
		'Others',
	],
};

export const footer = {
	description:
		'If you are interested in collaborating with us or would like to learn more about our reseach projects, please feel free to contact us at zahra.shakeri@utoronto.ca.',
};
