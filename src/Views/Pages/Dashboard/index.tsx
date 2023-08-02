import './index.scss';
import SideBar from './Layout/SideBar';
import { classes } from '@src/Tools/Utils/React';
import { useAdvancedState } from 'ahq-front-tools';
import useInitialize from '@src/Tools/Hooks/useInitialize';
import { DashboardProvider } from './Utils/DashboardContext';
import DashboardRouter from './routes';

const Dashboard = () => {
	//? ----------------------- State --------------------------

	const state = useAdvancedState({
		sidebar: { open: false },
		page: { active: 'home', subPage: '' },
	});

	//? ------------------- Initialize --------------------------

	useInitialize();

	// ----------------------------------------------------------

	return (
		<div {...classes('dashboard-layout', { 'dashboard-sidebar-open': !!state.tmp?.sidebar?.open })}>
			<DashboardProvider value={{ state: state as any }}>
				<SideBar />
				<div className='dashboard-content'>
					<DashboardRouter />
				</div>
			</DashboardProvider>
		</div>
	);
};

export default Dashboard;
