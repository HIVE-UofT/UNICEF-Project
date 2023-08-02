import routesArray from './routes';
import LoadingCover from '../../Components/LoadingCover';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROLE_ITEM } from '../../Tools/Store/reducers/AccountReducer';
import { FC, LazyExoticComponent, Suspense, Fragment, useRef } from 'react';

export type Path = {
	guard?: any;
	exact: boolean;
	path: string[];
	role?: Partial<Record<'is' | 'not', ROLE_ITEM[]>>;
	component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element) | FC;
};

export type RouteRendererProps = {
	base?: string;
	routes?: Path[];
	defaultRoute?: string;
	fallback?: () => JSX.Element;
};

const RouteRenderer: FC<RouteRendererProps> = props => {
	const isFirstRenderRef = useRef(true);
	const { fallback, base = '', defaultRoute, routes = routesArray } = props;
	const is_default_route_redirect = !!(isFirstRenderRef.current && defaultRoute);

	let DefaultRoute;
	if (is_default_route_redirect) {
		isFirstRenderRef.current = false;
		DefaultRoute = (
			<Route key='default' exact path={base}>
				<Redirect to={base + defaultRoute} />
			</Route>
		);
	}

	return (
		<Suspense fallback={fallback?.() || <LoadingCover />}>
			<Switch>
				{DefaultRoute}
				{routes.map((route, i) =>
					route.path.map(path => {
						let PathGuard = route.guard || Fragment;
						return (
							<Route key={i} path={`${base}${path}`} exact={route.exact}>
								<PathGuard>
									<route.component />
								</PathGuard>
							</Route>
						);
					})
				)}
			</Switch>
		</Suspense>
	);
};

export default RouteRenderer;
