import useAccount from '../useAccount';
import { ROLE_ITEM } from '../../Store/reducers/AccountReducer';

const useRole = () => {
	const { user } = useAccount();
	const role = user?.role;

	//? And
	const hasRoles = (roles: ROLE_ITEM[]) => {
		if (!role) return false;
		if (role?.isSuper) return true;
		if (role.items?.includes('ALL')) return true;
		return roles.every(r => !!role.items?.includes(r));
	};

	//? Or
	const isRole = (...roles: ROLE_ITEM[]) => {
		if (role?.isSuper) return true;
		if (!role || !roles || !roles?.length) return false;
		if (role.items?.includes('ALL')) return true;
		return roles.some(r => !!role.items?.includes(r));
	};

	return { hasRoles, isRole, user, role };
};

export default useRole;
