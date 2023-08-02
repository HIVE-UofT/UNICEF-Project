import { FC } from 'react';
import { If } from 'tsx-statements';
import useRole from '@tools/Hooks/useRole/useRole';
import { ROLE_ITEM } from '@tools/Store/reducers/AccountReducer';

export type RoleProps = { roles?: ROLE_ITEM[]; not?: ROLE_ITEM[]; is?: ROLE_ITEM[] };

const Role: FC<RoleProps> = ({ children, roles, not, is }) => {
	const { hasRoles, isRole, role } = useRole();
	if (!role) return null;

	let pass = roles?.length ? hasRoles(roles || []) : true;

	if (not?.length) pass = pass && !isRole(...not);

	if (is?.length) pass = pass && isRole(...is);

	return <If condition={pass}>{children}</If>;
};

export default Role;
