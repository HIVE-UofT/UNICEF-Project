import chart_image from '../Assets/Images/home/Banner1.png';
import toronto from '@assets/Images/home/p3.svg';
import dalla from '@assets/Images/home/p4.svg';
import instructor_img from '@assets/Images/home/instructor.svg';
import chart from '@assets/Images/home/statistic-chart.svg';
// import chart1 from '@assets/Images/home/chart1.png';
import chart1 from '@assets/Images/home/chart1-1.png';
import chart2 from '@assets/Images/home/chart2.jpg';
import chart3 from '@assets/Images/home/chart3.jpg';
import arash from '@assets/Images/home/arash.jpeg';


export const our_vision = {
    section: ' ',
    title: 'APPLIED MACHINE LEARNING FOR HEALTH DATA',
    sub_title: 'Exploring the Application of Machine Learning in \n' +
        'Public Health',
    description:'This course introduces practical machine learning in public health and healthcare. You will learn to develop, evaluate, and apply machine learning models for real healthcare issues, such as patient outcome prediction and disease diagnosis. Balancing theory and Python programming, the course offers hands-on projects and datathons, allowing you to apply your learning to actual healthcare data and solidify your understanding of machine learning concepts.'
};

export const our_chart = [
    {
        section: '',
        frameInNewRow: false,
        title: 'Current Education Level, the Dominant Feature!',
        description:
            'This Sunburst diagram contains the first two levels of the hierarchical structure, revealing the relationships between dimensions and risk factors. Each segment\'s size represents the frequency of its appearance in predictive models, enabling you to identify significant categories quickly.',
        iFrameLink: 'sunburst.html',
    },{
        section: ' ',
        title: 'Feature Hierarchy',
        description:
            'The Collapsible Tree diagram presents an interactive visualization of feature categorization for predicting student school dropout. The features are grouped into 30 distinct risk factors, and these 30 risk factors are further categorized into 9 comprehensive dimensions. Each feature node displays its frequency of appearance in previous school dropout models, allowing you to identify crucial predictors. You can explore the features by selecting the dimensions and risk factors you are interested in.',
        iFrameLink: 'collapsibleTree_FreqCounts.html',
        frameInNewRow: true,
    },
    {
        section: ' ',
        title: 'Feature occurrence',
        description:
            'The Bi-gram graph visualizes co-occurrence patterns of 30 risk factors extracted from predictive features for student school dropout. Each node represents a risk factor, and connections indicate how often two risk factors co-occur in predictive models. Adjusting the "min_freq" parameter would help you to focus on more prevalent co-occurrences. This user-friendly tool simplifies the process of selecting relevant features by tuning the \'min_freq\' until the desired patterns emerge.',
        iFrameLink: 'http://178.128.236.200:8502/',
        frameInNewRow: false,
    },
      {
        section: ' ',
        title: 'BirdEye View of the Features',
        frameInNewRow: true,
        description:
            'Unlike the previous interactive Treemap, this graph showcases all three hierarchical levels simultaneously, providing a comprehensive overview of the relationships between features, risks, and dimensions. The size of each rectangle corresponds to the frequency of its appearance in predictive models. The colour palette further enhances the visualization. By hovering over the rectangles, you can access additional information, such as the specific count for each feature.',
        iFrameLink: 'treeMap.html',
    },{
        section: '',
        title: 'Dropout Risk Factors',
        description:
            'This chord diagram visualizes the frequency of co-occurrence between different risk factors. There are 30 risk factors categorized from features extracted in previous studies. The width of the ribbons connecting two risk factors corresponds to the number of countries where those risk factors are used together in building predictive models. By examining the connections between risk factors, we can identify the most significant patterns and correlations that could aid in selecting predictive features.',
        iFrameLink: 'chord_Category_risk.html',
        frameInNewRow: false,
    }

];

export const instructor = {
    title: 'Team',
    name: 'DSI Trainee',
    image: 'https://hivelab-uoft.ca/images/team/ziqi_shu.jpeg',
    description: 'Ziqi Shu is a fourth-year undergraduate student at the University of Toronto, studying Cognitive Science and Computer Science. She is interested in applying computational models in studying human cognition and a wide range of topics in Computational Linguistics. In her spare time, Ziqi likes watching musicals, petting cats and sleeping.',
    people: [
        {
            name: 'Zahra Shakeri',
            image: 'https://raw.githubusercontent.com/HIVE-UofT/hive-uoft/main/images/team/zahra.jpg',
            description: 'Instructor',
            description2: 'Zahra Shakeri is an Assistant Professor at the University of Toronto’s Dalla Lana School of Public Health, specializing in Health Informatics, Information Visualization, and Digital Health. Her research focuses on precision (public) health, social media analysis, and digital health.',
        },
        {
            name: 'Arash Amigh',
            image: arash,
            description: 'Research Assistant ',
            description2: 'Arash is a skilled data scientist and machine learning enthusiast, boasting eight years of industry leadership. He also contributes as a research assistant at the HIVE Lab within the Dalla Lana School of Public Health, University of Toronto.'
        },
        {
            name: 'Aryan Sadeghi',
            image: 'https://raw.githubusercontent.com/HIVE-UofT/hive-uoft/main/images/team/aryan.jpeg',
            description: 'Research Assistant',
            description2: 'Aryan, with six years of leadership in the industry, is a data engineer and machine learning enthusiast. He is also a research assistant at the HIVE Lab in the Dalla Lana School of Public Health at the University of Toronto.'
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
