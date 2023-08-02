import { FC } from 'react';
import './ImagePreviewer.scss';
import { Popover, Whisper } from 'rsuite';

const ImagePreviewer: FC<Props> = props => {
	const { src, className = '', popoverClassName = '' } = props;

	const speaker = (
		<Popover className={`image-previewer-popover ${popoverClassName}`}>
			<img className='img-main' {...{ src }} alt='original' />
		</Popover>
	);

	return (
		<Whisper placement='auto' enterable speaker={speaker}>
			<div className={`image-previewer ${className}`}>
				<img className='img-small' {...{ src }} alt='previewer' />
			</div>
		</Whisper>
	);
};

type Props = {
	src: string;
	className?: string;
	popoverClassName?: string;
};

export default ImagePreviewer;
