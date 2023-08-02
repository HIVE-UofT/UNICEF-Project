import './Lecture.scss';
import { Panel } from 'rsuite';
import { useState, FC } from 'react';
import FaIcon from '@src/Components/FaIcon';
import { classes } from '@src/Tools/Utils/React';

type props = {
	data: any;
	anatomy: string;
};

const Lecture: FC<props> = props => {
	const [expanded, setExpanded] = useState(false);

	const onToggle = () => setExpanded(st => !st);

	return (
		<div className='lecture'>
			<div className='lecture-header'>
				<h1>{props.data?.title}</h1>
				<h3>{props.data?.subtitle}</h3>
				<img src={props.anatomy} alt='' />
				<Panel
					header={
						<div {...classes('description-header', { ' expanded': expanded })}>
							{props.data?.description}
							{!expanded && <div className='down-shadow' />}
						</div>
					}
					collapsible
					expanded={expanded}>
					<div className='description-body'>
						<div className='when-to-use mb-2'>
							<span>When to Use— </span>
							{props.data?.whenToUse}
						</div>
						<div className='example'>
							<span>Example— </span>
							{props.data?.example}
						</div>
					</div>
				</Panel>
				<div className='read-more'>
					<div className='toggle' onClick={onToggle}>
						<span>Read {expanded ? 'less' : 'more'}</span>
						<FaIcon fa='d-angle-down' className={expanded ? 'read-less' : ''} />
					</div>
				</div>
			</div>
			<div className='lecture-body'>{props.children}</div>
		</div>
	);
};

export default Lecture;
