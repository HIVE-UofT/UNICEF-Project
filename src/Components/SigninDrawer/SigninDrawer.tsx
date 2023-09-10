import Btn from '../BTN/BTN';
import './SigninDrawer.scss';
import FaIcon from '../FaIcon';
import useInputs from 'use-inputs';
import {data} from '@data/signin.data';
import {useEffect, useState, useRef} from 'react';
import useModal from '@tools/Hooks/useModal';
import {useHistory} from 'react-router-dom';
import {Notify} from '@src/Tools/Utils/React';
import useStore from '@src/Tools/Store/useStore';
import {classes} from '../../Tools/Utils/React';
import logo from '@assets/icons/logo-with-text.svg';
import useAccount from '@src/Tools/Hooks/useAccount';
import {Grid, Row, Col, Drawer, Checkbox} from 'rsuite';
import banner from '../../Assets/Images/signin/Banner2.png';
import {login, UserAuthApi} from '@src/Tools/Store/actions/AccountActions';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import {authFetch} from "@tools/Hooks/useFetch";
import {clearLocalStorage} from "@tools/Store/actions/LocalStorageActions";

const SigninDrawer = () => {
    const modal = useModal();
    const {push} = useHistory();
    const {dispatch} = useStore();
    const timer = useRef<any>();
    const [submitValidation, setSubmitValidation] = useState({username: true, password: true});
    const [isLogin, setIsLogin] = useState(true)
    const {isLoginDrawerOpen, loggedIn, loginDrawer, error} = useAccount();

    const {
        register,
        isDirty,
        valueOf,
        validOf,
        resetInputs,
        isInputsValid,
        isDirtyInputsValid,
        getDirtyInputsData
    } = useInputs(
        {
            validation: {
                username: {required: true},
                password: {required: true},
            },
        }
    );

    //?--------------------------- Utilities ------------------------------------
    const setSignUp = () => {
        setIsLogin(!isLogin)
    }

    const singUp = async () => {
        const password = valueOf('password');
        const username = valueOf('username');
        const key = valueOf('key');
        const full_name = valueOf('full_name');
        let data :any
        try {
            const {json} = await authFetch.post(`${UserAuthApi}/signup`, {
                body: {
                    email : username,
                    password : password,
                    full_name : full_name,
                    code : key
                },
                base: false,
            });
            data = json;
            if (!data || data?.error) {
                Notify.error('Error!');
            } else {
                Notify.success('You Signed Up successfully!');
                setIsLogin(true)
            }
        } catch (e: any) {
            Notify.error('Error!');
        }

    }
    const loginUser = async () => {
        if (!isInputsValid) {
            setSubmitValidation({
                username: !!validOf('username').isValid,
                password: !!validOf('password').isValid,
            });
            return;
        }
        const password = valueOf('password');
        const username = valueOf('username');
        await dispatch(login({username, password}));
        push('/dashboard');
        resetInputs();
        setSubmitValidation({
            username: true,
            password: true,
        });
    };

    // ? ----------------------------- functions -------------------------------
    const activeLoginSubmit = () => {
        if (Object.keys(getDirtyInputsData()).length < 2 || !isLogin) return false;
        return isDirtyInputsValid;
    };
    const activeSignUpSubmit = () => {
        if (Object.keys(getDirtyInputsData()).length !== 4 || isLogin) return false;
        return isDirtyInputsValid;
    };

    const closeDrawer = () => loginDrawer?.close();

    const openSection = (section: string) => {
        clearTimeout(timer.current);
        closeDrawer();
        timer.current = setTimeout(() => {
            window.location.hash = '';
            window.location.hash = section;
        }, 400);
    };

    //?------------------- useEffects --------------------------------------------

    useEffect(() => {
        closeDrawer();
    }, []);

    useEffect(() => {
        if (!error) return;
        Notify.error('Invalid', {placement: 'bottomCenter'});
    }, [error]);

    useEffect(() => {
        if (!loggedIn) return;
        closeDrawer();

        const afterAuthPath = localStorage?.getItem('redirect-path-after-auth');
        if (!!afterAuthPath) push(afterAuthPath);
        localStorage.removeItem('redirect-path-after-auth');
    }, [loggedIn]);

    // ---------------------------------------------------------------------------
    if (isLogin) {
        return (
            <Drawer
                full
                placement='left'
                className='signin-drawer'
                {...modal.register}
                open={isLoginDrawerOpen}
                onClose={loginDrawer?.close}>
                <Drawer.Body>
                    <Grid className='h-full w-full'>
                        <Row className='h-full w-full'>
                            <Col className='left-col relative' md={10}>
                                <FaIcon
                                    fa='r-angle-left'
                                    className='absolute left-4 top-8 w-7 h-7 text-primary cursor-pointer'
                                    onClick={() => loginDrawer?.close()}
                                />
                                <img className='logo' src={logo} alt='logo'/>
                                <div className='form-header'>
                                    <h3>{data.form.header}</h3>

                                    <p>
                                        {data.form.text.first_part}{' '}
                                        <span className='link-to-contact-us' onClick={() => openSection('contact-us')}>
										{data.form.text.link}
									</span>{' '}
                                        {data.form.text.last_part}
                                    </p>
                                </div>
                                <div className='contact-form'>
                                    <EditableInput
                                        type='text'
                                        label='Username'
                                        {...register('username')}
                                        placeholder='Enter your username'
                                        className={valueOf('username') ? 'dirty-input' : ''}
                                        isValid={isDirty('username') ? !!validOf('username').isValidDirty : submitValidation.username}
                                    />
                                    <EditableInput
                                        type='password'
                                        label='Password'
                                        {...register('password')}
                                        placeholder='Enter your password'
                                        className={valueOf('name') ? 'dirty-input' : ''}
                                        isValid={isDirty('name') ? !!valueOf('name') : submitValidation.password}
                                    />

                                    <div className='password-control'>
                                        <Checkbox>Remember Password</Checkbox>
                                        <a>Forget Password</a>
                                    </div>
                                    <Col md={12}>
                                        <Btn
                                            onClick={loginUser}
                                            disabled={!activeLoginSubmit()}
                                            {...classes({
                                                'active-btn': activeLoginSubmit(),
                                            })}>
                                            Sign In
                                        </Btn>
                                    </Col>
                                    <Col md={12}>
                                        <Btn
                                            disabled={activeLoginSubmit()}
                                            {...classes({
                                                'active-btn': !activeLoginSubmit(),
                                            })}
                                            onClick={setSignUp}>
                                            Sign Up
                                        </Btn>
                                    </Col>
                                </div>
                            </Col>
                            <Col className='right-col' md={14}>
                                {/*<div className='content'>*/}
                                {/*    <img src={banner} alt=''/>*/}
                                {/*</div>*/}
                            </Col>
                        </Row>
                    </Grid>
                </Drawer.Body>
            </Drawer>
        );
    } else {
        return (
            <Drawer
                full
                placement='left'
                className='signin-drawer'
                {...modal.register}
                open={isLoginDrawerOpen}
                onClose={loginDrawer?.close}>
                <Drawer.Body>
                    <Grid className='h-full w-full'>
                        <Row className='h-full w-full'>
                            <Col className='left-col relative' md={10}>
                                <FaIcon
                                    fa='r-angle-left'
                                    className='absolute left-4 top-8 w-7 h-7 text-primary cursor-pointer'
                                    onClick={() => loginDrawer?.close()}
                                />
                                <img className='logo' src={logo} alt='logo'/>
                                <div className='form-header'>
                                    <h3>{data.form.header}</h3>
                                    <p>

										<span className='link-to-contact-us' onClick={() => openSection('contact-us')}>
										{data.form.text.link}
									</span>{' '}
                                        {data.form.text.last_part}
                                    </p>
                                </div>
                                <div className='contact-form'>

                                    <EditableInput
                                        type='text'
                                        label='Email'
                                        {...register('username')}
                                        placeholder='Enter your email'
                                        className={valueOf('username') ? 'dirty-input' : ''}
                                        isValid={isDirty('username') ? !!validOf('username').isValidDirty : submitValidation.username}
                                    />
                                    <EditableInput
                                        type='password'
                                        label='Password'
                                        {...register('password')}
                                        placeholder='Enter your password'
                                        className={valueOf('name') ? 'dirty-input' : ''}
                                        isValid={isDirty('name') ? !!valueOf('name') : submitValidation.password}
                                    />
                                    <EditableInput
                                        type='text'
                                        label='Full Name'
                                        {...register('full_name')}
                                        placeholder='Enter your Full Name'
                                        className={valueOf('full_name') ? 'dirty-input' : ''}
                                    />
                                    <EditableInput
                                        type='text'
                                        label='Register Key'
                                        {...register('key')}
                                        placeholder='Enter Course Key'
                                        className={valueOf('key') ? 'dirty-input' : ''}
                                    />
                                    <Col md={12}>
                                        <Btn
                                            onClick={setSignUp}
                                            disabled={activeSignUpSubmit()}
                                            {...classes({
                                                'active-btn': !activeSignUpSubmit(),
                                            })}>
                                            Sign In
                                        </Btn>
                                    </Col>
                                    <Col md={12}>
                                        <Btn
                                            disabled={!activeSignUpSubmit()}
                                            {...classes({
                                                'active-btn': activeSignUpSubmit(),
                                            })}
                                            onClick={singUp}>
                                            Sign Up
                                        </Btn>
                                    </Col>
                                </div>
                            </Col>
                            <Col className='right-col' md={14}>
                                {/*<div className='content'>*/}
                                {/*    <img src={banner} alt=''/>*/}
                                {/*</div>*/}
                            </Col>
                        </Row>
                    </Grid>
                </Drawer.Body>
            </Drawer>
        );
    }

};

export default SigninDrawer;
