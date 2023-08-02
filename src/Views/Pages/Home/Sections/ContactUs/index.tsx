import './index.scss';
import useInputs from 'use-inputs';
import Btn from '@src/Components/BTN/BTN';
import { useEffect, useRef } from 'react';
import { contact_us } from '@src/Data/home.data';
import useStore from '@src/Tools/Store/useStore';
import Selector from '@src/Components/Selector/Selector';
import useFetch from '../../../../../Tools/Hooks/useFetch';
import { classes, Notify } from '../../../../../Tools/Utils/React';
import { useInView } from '@src/Tools/Hooks/useIntersectionObserver';
import { countries as COUNTRIES } from '@src/Data/all-countries.data';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import InputSelector from '@src/Components/InputSelector/InputSelector';
import { setActiveNavKey } from '@src/Tools/Store/actions/DashboardActions';

const ContactUs = () => {
	const { Post } = useFetch();
	const { dispatch } = useStore();
	const ref = useRef<HTMLDivElement | null>(null);
	const { isVisible } = useInView(ref);
	const { register, setInputValue, valueOf, validOf, resetInputs, getInputsData, isInputsValid } = useInputs({
		validation: {
			name: { required: true },
			email: {
				required: true,
				regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			},
			country: { required: true },
			issued_name: { required: true },
			department: { required: true },
			reason: { required: true },
			message: { required: true },
		},
	});

	// ? ------------------------- functions ----------------------------

	const onSubmit = async () => {
		// ? send message
		try {
			const body = { ...(getInputsData() || {}) };
			const res = await Post({ url: 'https://back.autohq.tech/projects/viz/contact-us', base: false, body });
			Notify.success(res?.message);
		} catch (e: any) {
			Notify.error('Unsuccessful!');
			return e;
		}

		resetInputs();
	};

	// ? ---------------------- useEffects ------------------------

	useEffect(() => {
		if (isVisible) {
			dispatch(setActiveNavKey('contact-us'));
		} else dispatch(setActiveNavKey(''));
	}, [isVisible]);

	// -------------------------------------------------------------

	return (
		<div className='contact-us' id='contact-us' ref={ref}>
			<div className='contact-content' data-aos='flip-up' data-aos-delay='200' data-aos-duration='800'>
				<div className='header'>
					<h2>{contact_us.section}</h2>
					<p>{contact_us.description}</p>
				</div>
				<div className='contact-form'>
					<EditableInput
						type='text'
						editable={true}
						label='Full name  *'
						{...register('name')}
						placeholder='Enter your full name'
						isValid={validOf('name').isValidDirty}
						className={valueOf('name') ? 'dirty-input' : ''}
					/>
					<EditableInput
						type='email'
						editable={true}
						{...register('email')}
						placeholder='Enter email'
						label='School/Industry Issued Email *'
						isValid={validOf('email').isValidDirty}
						className={valueOf('email') ? 'dirty-input' : ''}
					/>
					<InputSelector
						placeholder='Select'
						value={valueOf('country')}
						label='Country/Region of School/Industry *'
						onClean={() => setInputValue('country', '')}
						className={valueOf('country') ? 'dirty-input' : ''}
						onChange={value => setInputValue('country', value?.toString())}
						data={COUNTRIES.map(item => ({ label: item?.name, value: item?.name }))}
					/>
					<EditableInput
						editable={true}
						{...register('issued_name')}
						label='Name of School/Industry *'
						isValid={validOf('issued_name').isValidDirty}
						placeholder='Enter name of School/Industry'
						className={valueOf('issued_name') ? 'dirty-input' : ''}
					/>
					<EditableInput
						editable={true}
						label='Department *'
						{...register('department')}
						placeholder='Enter department'
						isValid={validOf('department').isValidDirty}
						className={valueOf('department') ? 'dirty-input' : ''}
					/>
					<Selector
						searchable={false}
						placeholder='Select'
						value={valueOf('reason')}
						onClean={() => setInputValue('reason', '')}
						className={!!valueOf('reason') ? 'dirty-input' : ''}
						label='Please let us know the reason for your inquiry *'
						onChange={value => setInputValue('reason', value?.toString())}
						data={contact_us.dropdownList.map(item => ({ label: item, value: item }))}
					/>
					<EditableInput
						type='text'
						lines={3}
						editable={true}
						{...register('message')}
						placeholder='Write your message'
						isValid={validOf('message').isValidDirty}
						className={valueOf('message') ? 'dirty-input' : ''}
						label='How will you be using this educational platform? *'
					/>
					<Btn
						type='submit'
						onClick={onSubmit}
						disabled={!isInputsValid}
						{...classes({ 'ready-to-submit': isInputsValid })}>
						Send
					</Btn>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
