import './index.scss';
import AOS from 'aos';
import { lazy, useEffect } from 'react';
import { AuthPath } from '../../App/Routes/Guard';
import RouteRenderer, { Path } from '../../App/Routes/RouteRenderer';
import SigninDrawer from '@src/Components/SigninDrawer/SigninDrawer';

const Root = () => {
	//?------------------- useEffects --------------------------------------------

	// Initialize AOS
	useEffect(() => AOS.init(), []);

	//----------------------------------------------------------------------------

	return (
		<div className='root-layout'>
			<SigninDrawer />
			<RouteRenderer routes={routesArray} />
		</div>
	);
};

export const routesArray: Path[] = [
	{
		exact: false,
		guard: AuthPath,
		path: ['/dashboard'],
		component: lazy(() => import('../Pages/Dashboard')),
	},
	{
		exact: false,
		path: ['/'],
		component: lazy(() => import('../Pages/Home/Layout')),
	},
];

export default Root;
