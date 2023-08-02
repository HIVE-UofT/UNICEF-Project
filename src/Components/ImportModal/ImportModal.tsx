import './ImportModal.scss';
import Btn from '../BTN/BTN';
import FaIcon from '../FaIcon';
import useInputs from 'use-inputs';
import { Else, If } from 'tsx-statements';
import Selector from '../Selector/Selector';
import { FC, useEffect, useState } from 'react';
import { classes } from '@src/Tools/Utils/React';
import { Modal, ModalProps, Uploader } from 'rsuite';
import EditableInput from '../EditableInput/EditableInput';

type ImportProps = ModalProps & {
	collection?: string;
	type: 'import' | 'edit';
	isDefaultCollection?: boolean;
};

const ImportModal: FC<ImportProps> = ({ type, collection, isDefaultCollection = false, ...rest }) => {
	const [section, setSection] = useState('');
	const [isListEmpty, setIsListEmpty] = useState(false);
	const { register, valueOf, setInputValue } = useInputs();

	useEffect(() => {
		if (collection) {
			if (isDefaultCollection) setSection(collection);
			else {
				setSection('New Collection');
				setInputValue('collection name', collection);
			}
		}
	}, []);

	return (
		<Modal className='import-modal' size='xs' backdrop='static' {...rest}>
			<Modal.Header className='border-none'></Modal.Header>
			<Modal.Body>
				<div className='modal-icon'>
					<FaIcon fa={type === 'edit' ? 'l-file-pen' : 'l-file-circle-plus'} />
				</div>
				<div className='modal-text animate-fade-in'>
					<If condition={type === 'import'}>
						<If condition={isDefaultCollection || (!!section && defaultCollections.includes(section))}>
							<p>Upload New Collections in {collection} Section!</p>
							<Else>
								<If condition={!!section && !defaultCollections.includes(section)}>
									<p>Choose a Name for your Collection and Upload Collections!</p>
									<Else>
										<p>Where do you want to add the new molecules?</p>
									</Else>
								</If>
							</Else>
						</If>
					</If>
					<If condition={type === 'edit'}>
						<If condition={isDefaultCollection}>
							<p>Edit your Collection and Import more Collections!</p>
							<Else>
								<p>Edit your Collection Name or Import more Collections!</p>
							</Else>
						</If>
					</If>
				</div>
				<Selector
					value={section}
					placeholder=' '
					cleanable={false}
					searchable={false}
					label='Select Section'
					readOnly={!!collection}
					menuClassName='collection-menu'
					onChange={value => setSection(value?.toString())}
					data={collections.map(item => ({ label: item, value: item }))}
					{...classes({ 'dirty-input': !!section }, { ' specified-collection': !!collection })}
				/>
				<If condition={section === 'New Collection'}>
					<EditableInput
						label='Collection Name'
						{...register('collection name')}
						className={valueOf('collection name') ? 'dirty-input' : ''}
					/>
				</If>
				<If condition={!!section}>
					<Uploader
						multiple
						draggable
						action='//jsonplaceholder.typicode.com/posts/'
						onChange={list => setIsListEmpty(list.length === 0)}>
						<div className='upload'>
							<div className='modal-icon'>
								<FaIcon fa='l-file-arrow-up' />
							</div>
							{!isListEmpty && <p>Upload More Collection</p>}
							{isListEmpty && <p>Upload New Collection</p>}
						</div>
					</Uploader>
				</If>
				<Btn
					disabled={isListEmpty || (section === 'New Collection' ? !valueOf('collection name') : false)}
					className={
						!isListEmpty && (section === 'New Collection' ? !!valueOf('collection name') : true)
							? 'result-btn result-active'
							: 'result-btn'
					}>
					Done
				</Btn>
			</Modal.Body>
		</Modal>
	);
};

const defaultCollections = ['Ionizable Lipid', 'Helper Lipid', 'Sterols', 'PEGylated Lipid'];
const collections = defaultCollections.concat(['New Collection']);

export default ImportModal;
