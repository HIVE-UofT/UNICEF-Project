import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { CONFIG } from '@src/App/Config/constants';
import RouteRenderer, { Path } from '@src/App/Routes/RouteRenderer';

const DashboardRouter = () => <RouteRenderer base='/dashboard/settings' {...{ routes }} />;

export const routes: Path[] = [
	{
		exact: false,
		path: ['/users/:id'],
		component: lazy(() => import('./User')),
	},
	{
		exact: false,
		path: ['/users'],
		component: lazy(() => import('./Users')),
	},

	{
		exact: true,
		path: ['*'],
		component: () => <Redirect to={CONFIG.BASE_URL} />,
	},
];

export default DashboardRouter;
