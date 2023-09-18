import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { CONFIG } from '../../../App/Config/constants';
import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';

const DashboardRouter = () => <RouteRenderer base='/dashboard' {...{ routes }} />;

export const routes: Path[] = [
	{
		exact: false,
		path: ['/settings'],
		component: lazy(() => import('./Settings')),
	},
	{
		exact: false,
		path: ['/'],
		component: lazy(() => import('./MainContainer')),
	},
	{
		exact: true,
		path: ['*'],
		component: () => <Redirect to={CONFIG.BASE_URL} />,
	},
];

export default DashboardRouter;
