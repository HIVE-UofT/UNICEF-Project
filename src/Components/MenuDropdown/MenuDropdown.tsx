import './MenuDropdown.scss';
import { FC, useRef } from 'react';
import { Dropdown } from 'rsuite';
import { IconNames } from '@assets/fontawesome/fa.names';
import FaIcon from '../FaIcon';

const MenuDropdown: FC<{
	mainMenu?: any;
	submenus?: { icon: IconNames; title?: string; action?: () => void; iconClass?: string }[];
	title?: string;
}> = ({ mainMenu, submenus, title }) => {
	const ref = useRef<any>();

	return (
		<Dropdown
			title={title}
			ref={ref}
			placement='rightStart'
			className='footer-dropdown'
			renderToggle={(props, ref) => (
				<div ref={ref} {...props}>
					{mainMenu}
				</div>
			)}>
			{submenus?.map((item, i) => (
				<Dropdown.Item
					key={i}
					className={item?.iconClass}
					icon={<FaIcon fa={item?.icon} />}
					eventKey={i}
					onSelect={item?.action}>
					{item?.title}
				</Dropdown.Item>
			))}
		</Dropdown>
	);
};

export default MenuDropdown;
