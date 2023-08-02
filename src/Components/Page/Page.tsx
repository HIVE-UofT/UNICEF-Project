import './Page.scss';
import { classes } from '@tools/Utils/React';
import { FC, forwardRef, HTMLAttributes } from 'react';

type PageProps = Partial<HTMLAttributes<HTMLDivElement>>;

const Page: FC<PageProps> = forwardRef((props, ref) => {
	const { children, className = '', ...rest } = props;
	return (
		<div ref={ref as any} {...classes('page-layout', className)} {...rest}>
			{children}
		</div>
	);
});

export default Page;
