import './index.scss';
import useInputs from 'use-inputs';
import { If } from 'tsx-statements';
import Box from '@src/Components/Box/Box';
import Btn from '@src/Components/BTN/BTN';
import { useEffect, useState } from 'react';
import FaIcon from '@src/Components/FaIcon';
import Footer from '../../../Layout/Footer';
import useClass from '@src/Tools/Hooks/useClass';
import useStore from '@src/Tools/Store/useStore';
import { useAdvancedState } from 'ahq-front-tools';
import usePageMode from '@tools/Hooks/usePageMode';
import useAccount from '@src/Tools/Hooks/useAccount';
import PanelLoader from '@src/Components/PanelLoader';
import { useHistory, useParams } from 'react-router-dom';
import { classNames, Notify } from '@src/Tools/Utils/React';
// import useGallery from '@src/Components/Gallery/useGallery';
import { logout } from '@src/Tools/Store/actions/AccountActions';
import { ACCESSES } from '@src/Tools/Store/reducers/AccountReducer';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import { CheckTree, Col, Container, Modal, Radio, RadioGroup, Row, Toggle } from 'rsuite';

const User = () => {
	const param: any = useParams();
	const { id } = param || {};
	const { user } = useAccount();
	const { mode } = usePageMode();
	const { dispatch } = useStore();
	const { push, replace } = useHistory();
	const { Class: USER } = useClass('VIZ_SYSTEM_USER');
	// const { registerMediaPicker, setMediaPickerOpen } = useGallery();

	// ? --------------- Extra Vars 👇 ------------------------------- //
	const state = useAdvancedState({ accesses: { isSuper: false, items: [] as string[] }, data: {} as any });
	const { name, email, username, status, password } = state?.org?.data;
	// const imageId = state?.tmp?.data?.image?.item?.VIZ_SYSTEM_USER_GALLERY_ID;
	const isSuperUser = !!user?.role?.isSuper;
	const currUser = user?.ID === id;
	const [showPass, setShowPass] = useState(false);
	const [delModal, setDelModal] = useState(false);
	const [logoutModal, setLogoutModal] = useState(false);
	const [accessModal, setAccessModal] = useState(false);

	// ? --------------- Hooks 👇 ------------------------------- //

	const { isSomeModified, isInputsValid, labelOf, register, getInputsData, valueOf, setInputValue, resetInputs } = useInputs({
		labels: {
			role: 'Role *',
			email: 'Email *',
			status: 'Status',
			name: 'Full Name *',
			username: 'Username *',
			password: 'Password ',
		},
		validation: {
			name: { required: true },
			email: { required: true },
			username: { required: true },
			password: { required: mode?.is?.add },
		},
	});

	// ? --------------- Utils 👇 ------------------------------- //

	const accessOptions = Object?.entries(ACCESSES)?.map(([k1, v1]) => ({
		value: k1,
		label: v1?.label,
		children: Object?.entries(v1?.children)?.map(([k2, v2]) => ({ label: v2?.label, value: k2 })),
	}));

	// ? --------------- Functions 👇 --------------- //
	const onCancel = () => {
		resetInputs();
		state?.set?.tmp(state?.org);
		mode?.set?.edit(false);
	};

	const closeAccessModal = () => {
		setAccessModal(false);
		state?.set?.tmp('accesses', state?.tmp?.data.role || { isSuper: false, items: [] });
	};

	const saveAccessModal = () => {
		setAccessModal(false);
		state?.set?.tmp('data.role', state?.tmp?.accesses);
	};

	// ---------- Get User ---------- //
	const getUser = async () => {
		try {
			const { item } = (await USER?.getItem(id)) || {};

			state?.set?.org('data', item || {});
			state?.set?.org('accesses', item?.role || {});

			// setImage(item?.image?.item || {});
		} catch (e: any) {
			Notify?.error(e?.message);
			push('/dashboard/system-setting/users');
		}
	};

	// ---------- Set User ---------- //
	const setUser = async () => {
		try {
			const { item, message } =
				(await USER?.putItem({
					VIZ_SYSTEM_USER_ID: mode?.is?.add ? undefined : id,
					...getInputsData(),
					password: !valueOf('password') ? undefined : valueOf('password'),
					role: state?.tmp?.data?.role,
					// image: imageId,
				})) || {};

			Notify?.success(message || 'User updated successfully');
			mode?.set?.edit(false);
			state?.set?.org('data', item || {});
			state?.set?.org('accesses', item?.role || {});
			if (mode?.is?.add) replace(`/dashboard/settings/users/${item?.VIZ_SYSTEM_USER_ID}`);
		} catch (e: any) {
			Notify?.error(e?.message);
		}
	};

	// ---------- Delete User ---------- //
	const deleteUser = async () => {
		try {
			const item = await USER?.deleteItem(id);
			Notify?.success(item?.message || 'User deleted successfully');
			push('/dashboard/settings/users');
		} catch (e: any) {
			Notify?.error(e?.message);
		}
	};
	// ---------- Log Out ---------- //
	const logOut = () => {
		push('/dashboard');
		dispatch(logout());
	};

	// ? --------------- UseEffects 👇 --------------- //

	useEffect(() => {
		if (mode?.is?.add) return;
		getUser();
	}, [id]);

	const header = (
		// <div className='header'>
		// 	<div className='img-wrapper'>
		// 		<FaIcon fa='r-paperclip' />
		// 		<If condition={!state?.tmp?.data?.image?.item?.thumbnail}>
		// 			<FaIcon fa='s-user' />

		// 			<Else>
		// 				<img src={state?.tmp?.data?.image?.item?.thumbnail} alt={valueOf('name')} />
		// 			</Else>
		// 		</If>

		// 		<If condition={mode?.is?.edit}>
		// 			<div className='footer-wrapper' title='Select Image'>
		// 				<FaIcon fa='s-camera' onClick={() => setMediaPickerOpen(true)} />
		// 			</div>
		// 		</If>
		// 	</div>
		// </div>

		<div className='flex items-center opacity-60 py-3'>
			<FaIcon fa='r-user' />
			User Information
		</div>
	);

	const rightHeader = (
		<If condition={!mode?.is?.add}>
			<Btn
				fa={mode?.is?.edit ? 'r-pen-slash' : 'r-pen'}
				children={mode?.is?.edit ? 'Cancel' : 'Edit User'}
				onClick={() => (mode?.is?.edit ? onCancel() : mode?.set?.edit(true))}
			/>
			<If condition={user?.ID !== id && isSuperUser}>
				<Btn fa='r-trash' children='Delete User' onClick={() => setDelModal(true)} />
			</If>
		</If>
	);

	// ---------- Input boxes ---------- //
	const viewAccess = state?.tmp?.accesses?.isSuper
		? 'Super Admin'
		: state?.tmp?.accesses?.items
				?.map((i: any) => {
					return i === 'ALL' ? 'All' : (ACCESSES as any)?.ALL?.children?.[i]?.label;
				})
				?.join(', ');

	const inputsData = {
		name,
		role: viewAccess,
		email,
		username,
		password,
		status: status === undefined ? 'ACTIVE' : status,
	};

	(!isSuperUser || currUser) && delete inputsData?.status;

	const inputsBoxes = Object.entries(inputsData || {})?.map(([key, defaultValue], i) => {
		const label = labelOf(key);
		const value = valueOf(key);

		const innerComponent = (
			<If condition={i === 4}>
				<FaIcon fa={showPass ? 's-eye' : 's-eye-slash'} onClick={() => setShowPass(s => !s)} />
			</If>
		);

		let Element = <></>;
		if (i !== 1 && i !== 5)
			Element = (
				<EditableInput
					editable={mode?.is?.edit}
					{...{ label, innerComponent }}
					{...register(key, { defaultValue })}
					type={i !== 4 || showPass ? 'text' : 'password'}
				/>
			);

		if (i === 1)
			Element = (
				<div onClick={() => mode?.is?.edit && isSuperUser && setAccessModal(true)} title={viewAccess}>
					<EditableInput editable={mode?.is?.edit} {...{ label }} value={inputsData?.role} readOnly />
				</div>
			);

		if (i === 5)
			Element = (
				<RadioGroup
					inline
					name='status'
					{...{ value }}
					className='radio-group'
					readOnly={!mode?.is?.edit}
					{...register('status', {
						defaultValue,
						onChange: (v: any) => setInputValue('status', v),
					})}>
					<label className='label'>{labelOf('status')}:</label>
					<Radio children='Active' value='ACTIVE' />
					<Radio children='Disable' value='DISABLE' />
				</RadioGroup>
			);

		return (
			<Col xs={24} md={12} key={key}>
				{Element}
			</Col>
		);
	});

	return (
		<Container className='user-layout-container'>
			<PanelLoader loading={USER?.loadings?.getItem}>
				<Box
					header={header}
					rightSideHeader={rightHeader}
					className={classNames('user-layout', { disabled: !mode?.is?.edit })}>
					<Row>{inputsBoxes}</Row>

					<If condition={(state?.changed || isSomeModified) && mode?.is?.edit}>
						<div className='user-layout-footer'>
							<Btn
								children='Save'
								onClick={setUser}
								appearance='primary'
								disabled={!isInputsValid || !state?.tmp?.accesses?.items?.length}
							/>
						</div>
					</If>
				</Box>

				<div className='under-box-wrapper'>
					<If condition={isSuperUser}>
						<Btn
							children='Back'
							fa='d-arrow-left'
							className='back-btn'
							onClick={() => push('/dashboard/settings/users')}
						/>
					</If>
					<If condition={currUser}>
						<Btn
							children='Logout'
							className='logout-btn'
							fa='r-arrow-right-from-bracket'
							onClick={() => setLogoutModal(true)}
						/>
					</If>
				</div>
			</PanelLoader>

			<Footer />

			{/* Access Modal */}
			<Modal size='sm' className='access-modal' onClose={closeAccessModal} open={accessModal}>
				<Modal.Header>Access</Modal.Header>
				<Modal.Body>
					<div>
						<label className='mx-4 mt-4'>Super Admin</label>
						<Toggle
							checked={state?.tmp?.accesses?.isSuper}
							onChange={v => state?.set?.tmp('accesses', { isSuper: v, items: v ? ['ALL'] : [] })}
						/>

						<hr className='my-3' />

						<CheckTree
							defaultExpandAll
							data={accessOptions}
							value={Object?.values(state?.tmp?.accesses?.items || {})}
							onChange={(v: any) => state?.set?.tmp('accesses', { isSuper: false, items: v })}
						/>
					</div>

					<div className='modal-footer'>
						<Btn children={'Cancel'} className='cancel-btn' onClick={closeAccessModal} />
						<Btn children={'Save'} className='yes-btn' onClick={saveAccessModal} />
					</div>
				</Modal.Body>
			</Modal>

			{/* logout Modal */}
			<Modal size='xs' open={logoutModal} onClose={() => setLogoutModal(false)} className='logout-modal'>
				<Modal.Header>
					<div className='logout-icon'>
						<FaIcon fa='l-arrow-right-from-bracket' />
					</div>
				</Modal.Header>
				<span className='logout-text'>Are you sure you want to Log out of your account?</span>
				<div className='modal-footer'>
					<Btn children='Cancel' onClick={() => setLogoutModal(false)} className='cancel-btn' />
					<Btn children='Log Out' onClick={logOut} className='yes-btn' />
				</div>
			</Modal>

			{/* Delete Modal */}
			<Modal size='xs' open={delModal} onClose={() => setDelModal(false)}>
				<Modal.Header>
					<FaIcon fa='s-trash' />
					Delete User
				</Modal.Header>
				Are You sure you want to delete this user?
				<div className='modal-footer'>
					<Btn children='Cancel' onClick={() => setDelModal(false)} className='cancel-btn' />
					<Btn children='Yes' fa='d-check' onClick={deleteUser} className='yes-btn' />
				</div>
			</Modal>

			{/* <MediaPicker
				ID={imageId}
				tag='user-avatar'
				mediaTypes={['image']}
				{...registerMediaPicker}
				tableName='VIZ_SYSTEM_USER_GALLERY'
				relatedClassID={state?.tmp?.data?.VIZ_SYSTEM_USER_ID}
				onRemove={async _ => state?.set?.tmp('data.image.item', {})}
				onSaved={async (item: any) => state?.set?.tmp('data.image.item', item)}
			/> */}
		</Container>
	);
};

export default User;
