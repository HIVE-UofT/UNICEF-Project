import './index.scss';
import Home from './pages/Home';
import Footer from '../Layout/Footer';
import Bar from './pages/Lecture2/Bar';
import Box from './pages/Lecture4/Box';
import Area from './pages/Lecture6/Area';
import Tree from './pages/Lecture5/Trees';
import Topic from './pages/Lecture3/Topic';
import Comet from './pages/Lecture6/Comet';
import Chord from './pages/Lecture9/Chord';
import Pie from './pages/Lecture2/Pie/index';
import Violin from './pages/Lecture4/Violin';
import Sankey from './pages/Lecture6/Sankey';
import Stream from './pages/Lecture6/Stream';
import Story1 from './pages/Lecture7/Story1';
import Story2 from './pages/Lecture7/Story2';
import Story3 from './pages/Lecture7/Story3';
import Likert from './pages/Lecture10/Likert';
import Tile from './pages/Lecture2/Tile/index';
import Treemap from './pages/Lecture5/Treemap';
import Bump from './pages/Lecture9/Bump/index';
import { Else, If, OtherWise, Select, When } from 'tsx-statements';
import Sunburst from './pages/Lecture5/Sunburst';
import Upset from './pages/Lecture9/Upset/index';
import Bubble from './pages/Lecture2/Bubble/index';
import Funnel from './pages/Lecture9/Funnel/index';
import {IntroToPython, MachineLearning, PythonApplications} from './pages/Lecture1';
import Network from './pages/Lecture3/Network/index';
import Lollipop from './pages/Lecture1/Lollipop/index';
import Parallel from './pages/Lecture9/Parallel/index';
import Sparkline from './pages/Lecture6/Sparkline/index';
import CategoricalTableau from './pages/Lecture2/Tableau';
import Choropleth from './pages/Lecture8/Choropleth/index';
import PackedCircle from './pages/Lecture5/PackedCircle/index';
import { useDashboardContext } from '../Utils/DashboardContext';
import ChoroplethTableau from './pages/Lecture8/ChoroplethTableau/index';
import {Python2, KNN, Kmeans, SvU} from "@src/Views/Pages/Dashboard/MainContainer/pages/Lecture2";

const MainContainer = () => {
	const { state } = useDashboardContext();
	return (
		<div className='main-container'>
			<If condition={['home']?.includes(state?.tmp?.page?.active)}>
				<Home />
			</If>
			 {/*Pashmammmmmmmmm, todo: refactor as soon as posible !*/}
			<If condition={state.tmp?.page?.active === 'L1'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Machine Learning Tasks'} children={<MachineLearning />} />
					<When condition={state.tmp?.page?.subPage === 'Python Basics'} children={<IntroToPython />} />
					<When condition={state.tmp?.page?.subPage === 'Python Practical Application'} children={<PythonApplications />} />
					<OtherWise children={<Home />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L2'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Supervises vs. Unsupervised Learning'} children={<SvU />} />
					<When condition={state.tmp?.page?.subPage === 'Python Basics II'} children={<Python2 />} />
					<When condition={state.tmp?.page?.subPage === 'K-Nearest Neighbours'} children={<KNN />} />
					<When condition={state.tmp?.page?.subPage === 'K-Means'} children={<Kmeans />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L3'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Sentiment Analysis - and n-grams'} children={<Network />} />
					<When condition={state.tmp?.page?.subPage === 'Topic Modeling'} children={<Topic />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L4'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Box'} children={<Box />} />
					<When condition={state.tmp?.page?.subPage === 'Violin'} children={<Violin />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L5'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Trees'} children={<Tree />} />
					<When condition={state.tmp?.page?.subPage === 'Sunburst'} children={<Sunburst />} />
					<When condition={state.tmp?.page?.subPage === 'Packed circles'} children={<PackedCircle />} />
					<When condition={state.tmp?.page?.subPage === 'Treemap'} children={<Treemap />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L6'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Area'} children={<Area />} />

					<When condition={state.tmp?.page?.subPage === 'Comet'} children={<Comet />} />
					<When condition={state.tmp?.page?.subPage === 'Sankey'} children={<Sankey />} />
					<When condition={state.tmp?.page?.subPage === 'Sparkline'} children={<Sparkline />} />
					<When condition={state.tmp?.page?.subPage === 'Stream'} children={<Stream />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L7'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Story1 - Lives Lost to Suicide'} children={<Story1 />} />
					<When condition={state.tmp?.page?.subPage === 'Story2 - Suicidal Thoughts'} children={<Story2 />} />
					<When condition={state.tmp?.page?.subPage === 'Story3 - Cannabis Use'} children={<Story3 />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L8'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Choropleth'} children={<Choropleth />} />
					<When
						condition={state.tmp?.page?.subPage === 'Tableau Tutorial (Bubble & Choropleth Maps)'}
						children={<ChoroplethTableau />}
					/>
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L9'}>
				<Select>
					<When condition={state.tmp?.page?.subPage === 'Bump'} children={<Bump />} />
					<When condition={state.tmp?.page?.subPage === 'Chord'} children={<Chord />} />
					<When condition={state.tmp?.page?.subPage === 'Funnel'} children={<Funnel />} />
					<When condition={state.tmp?.page?.subPage === 'Parallel Coordinates'} children={<Parallel />} />
					<When condition={state.tmp?.page?.subPage === 'Upset'} children={<Upset />} />
				</Select>
			</If>
			<If condition={state.tmp?.page?.active === 'L10'}>
				<When condition={state.tmp?.page?.subPage === 'Likert'} children={<Likert />} />
			</If>
			<Footer />
		</div>
	);
};

export default MainContainer;
