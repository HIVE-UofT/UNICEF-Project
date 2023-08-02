import './ModifiedConfirmModal.scss';
import { FC } from 'react';
import FaIcon from '../FaIcon';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { IconNames } from '../../Assets/fontawesome/fa.names';
import { ConfirmModalProps } from '../ConfirmModal/ConfirmModal';

type Props = ConfirmModalProps & {
	modalText: string;
	modalIcon: IconNames;
	acceptTitle?: string;
};
const ModifiedConfirmModal: FC<Props> = ({ modalIcon, modalText, acceptTitle, ...rest }) => {
	return (
		<ConfirmModal btnSettings={{ accept: { title: acceptTitle } }} className='modified-confirm-modal' {...rest}>
			<div className='modal-icon'>
				<FaIcon fa={modalIcon} />
			</div>
			<div className='modal-text'>
				<p>{modalText}</p>
			</div>
		</ConfirmModal>
	);
};

export default ModifiedConfirmModal;
