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
    'The foremost feature utilized by the existing studies to predict school dropout is the current study status of students—a key indicator that cannot be ignored. However, it is crucial to acknowledge that there are other aspects that demand our attention as well.',
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
    title: 'Ziqi Shu',
    name: 'DSI Trainee',
        image: 'https://hivelab-uoft.ca/images/team/ziqi_shu.jpeg',
    description: 'Ziqi Shu is a fourth-year undergraduate student at the University of Toronto, studying Cognitive Science and Computer Science. She is interested in applying computational models in studying human cognition and a wide range of topics in Computational Linguistics. In her spare time, Ziqi likes watching musicals, petting cats and sleeping.',
    people: [
        // {
        //     name: 'Zahra Shakeri',
        //     image: 'https://hivelab-uoft.ca/images/team/zahra.jpg',
        //     description: 'Supervisor',
        // },
        // {
        //     name: 'Ziqi Shu',
        //     image: 'https://hivelab-uoft.ca/images/team/ziqi_shu.jpeg',
        //     description: 'Creator',
        // }
        // , {
        //     name: 'Jiayu Liangm',
        //     image: 'https://hivelab-uoft.ca/images/team/Grace.JPG',
        //     description: 'Creator',
        // }, {
        //     name: 'Yong Chen',
        //     image: 'https://hivelab-uoft.ca/images/team/yong.png',
        //     description: 'Creator',
        // }

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
