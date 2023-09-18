import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { CONFIG } from '@src/App/Config/constants';
import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';

const DashboardRouter = () => <RouteRenderer base='/dashboard/settings' {...{ routes }} />;

export const routes: Path[] = [
	{
		exact: false,
		path: ['/teams/:id'],
		component: lazy(() => import('./Teams/Team')),
	},
	{
		exact: false,
		path: ['/teams'],
		component: lazy(() => import('./Teams/Teams')),
	},
	{
		exact: false,
		path: ['/users/:id'],
		component: lazy(() => import('./Users/User')),
	},
	{
		exact: false,
		path: ['/users'],
		component: lazy(() => import('./Users/Users')),
	},

	{
		exact: true,
		path: ['*'],
		component: () => <Redirect to={CONFIG.BASE_URL} />,
	},
];

export default DashboardRouter;
