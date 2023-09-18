import './index.scss';
import useInputs from 'use-inputs';
import {Else, If} from 'tsx-statements';
import Box from '@src/Components/Box/Box';
import Btn from '@src/Components/BTN/BTN';
import {useEffect, useState} from 'react';
import FaIcon from '@src/Components/FaIcon';
import Footer from '../../../Layout/Footer';
import useClass, {APIAddr} from '@src/Tools/Hooks/useClass';
import useStore from '@src/Tools/Store/useStore';
import {useAdvancedState} from 'ahq-front-tools';
import usePageMode from '@tools/Hooks/usePageMode';
import useAccount from '@src/Tools/Hooks/useAccount';
import PanelLoader from '@src/Components/PanelLoader';
import {useHistory, useParams} from 'react-router-dom';
import {classNames, Notify} from '@src/Tools/Utils/React';
// import useGallery from '@src/Components/Gallery/useGallery';
import {logout} from '@src/Tools/Store/actions/AccountActions';
import {ACCESSES} from '@src/Tools/Store/reducers/AccountReducer';
import EditableInput from '@src/Components/EditableInput/EditableInput';
import {CheckTree, Col, Container, Modal, Radio, RadioGroup, Row, Toggle} from 'rsuite';
import useFetch from "@tools/Hooks/useFetch";
import LabeledWrapper from "@components/LabeledWrapper/LabeledWrapper";

const User = () => {

    const {Class: TEAMS} = useClass('teams');
    const [name, setName] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [status, setStatus] = useState<string>("")
    const [newUser, setNewUser] = useState<string>("")
    const [newUserLast, setNewUserLast] = useState<string>("")
    const [registeredUser, setRegisteredUser] = useState<string[]>(Array)
    const [groups, setGroups] = useState<any[]>(Array)
    const {mode} = usePageMode();
    const {user, tokenRef} = useAccount();
    const { push, replace } = useHistory();
    const param: any = useParams();
    const {id} = param || {};
    useEffect(() => {
        if (mode?.is?.add) return;
        getHackathon()
    }, [id]);

    const getHackathon = async () => {
        try {
            const respObj = await fetch(
                `${APIAddr}/teams/${id}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + tokenRef?.current,
                    },
                },
            )
            const responseBody = await respObj.json();
            const response = responseBody.item
            setName(response.name)
            setCount(response.count)
            setStatus(response.status)
            console.log(response.teams)
            setGroups(response.teams)
            if (response.users && response.users.length > 0) {
                setRegisteredUser(response.users)
            }
            if (response.teams && response.teams.length > 0) {
                setGroups(response.teams)
            }
        } catch (e: any) {
            Notify?.error(e?.message);
        }
    };
    async function generate() {
        try {
            const response = await fetch(
                `${APIAddr}/teams/${id}/generate`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + tokenRef?.current,
                    },
                },
            )
            if (response.status == 200) {
                window.location.reload();
            } else {
                const jsonData = await response.json();
                console.log(jsonData)
                Notify?.error(jsonData.message);
            }
        } catch (e) {
            console.log(e)
            Notify?.error('Error');
        }
    }

    async function addUser() {
        try {
            const response = await fetch(
                `${APIAddr}/teams/${id}/add-user`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + tokenRef?.current,
                    },
                    body: JSON.stringify({
                        name: newUser + " "+ newUserLast,
                    }),
                },
            )
            if (response.status == 200) {
                Notify?.success('success');
                window.location.reload();
            } else {
                const jsonData = await response.json();
                console.log(jsonData)
                Notify?.error(jsonData.message);
            }
        } catch (e) {
            console.log(e)
            Notify?.error('Error');
        }
    }

    async function newTeam() {
        try {
            const response = await fetch(
                `${APIAddr}/teams`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + tokenRef?.current,
                    },
                    body: JSON.stringify({
                        name: name,
                        count: count
                    }),
                },
            )

            if (response.status == 200) {
                push('/dashboard/settings/teams');
            } else {
                const jsonData = await response.json();
                console.log(jsonData)
                Notify?.error(jsonData.message);
            }
        } catch (e) {
            console.log(e)
            Notify?.error('Error');
        }
    }

    const header = (
        <div className='flex items-center opacity-60 py-3'>
            <FaIcon fa='s-users-medical'/>
            <If condition={mode?.is?.add}>
                New Datathon
                <Else>
                    Datathon
                </Else>
            </If>
        </div>
    );

    function getMe() {

        console.log("salam",typeof groups)

        return "Hi!"
    }
    function Update() {
        return (
            <Container className='team-update-layout'>
                <PanelLoader>
                    <Row>

                        <Col  xs={12} md={12}>
                            <Box header={header} className='user-layout'>
                                <Row>
                                    <Col xs={24} md={24}>
                                        <EditableInput
                                            readOnly={status == "ACTIVE"}
                                            label='Datathon Name'
                                            type='text'
                                            value={name}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                setName(event.target.value)
                                            }
                                        />

                                    </Col>
                                    <Col xs={24} md={24}>
                                        <EditableInput
                                            readOnly={status == "ACTIVE"}
                                            label='Number in the Team'
                                            type='number'
                                            value={count}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                setCount(Number(event.target.value))
                                            }
                                        />
                                    </Col>

                                </Row>
                                <Row>
                                    <div className='user-layout-footer'>
                                        <Col xs={12} md={6}>
                                            <EditableInput
                                                label='First Name'
                                                type='text'
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    setNewUser(event.target.value)
                                                }
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <EditableInput
                                                label='Last Name'
                                                type='text'
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    setNewUserLast(event.target.value)
                                                }
                                            />
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Btn
                                                className='new-user-btn'
                                                children='Add Me!'
                                                onClick={addUser}
                                                appearance='primary'
                                            />
                                        </Col>
                                        <If condition={user?.role?.isSuper}>
                                        <Col xs={24} md={8}>
                                            <If condition={mode?.is?.add}>
                                                <Btn
                                                    className='new-user-btn'
                                                    children='Save'
                                                    onClick={newTeam}
                                                    appearance='primary'
                                                />
                                                <Else>
                                                    <Btn
                                                        className='new-user-btn'
                                                        children='Generate Teams'
                                                        onClick={generate}
                                                        appearance='primary'
                                                    />
                                                </Else>
                                            </If>

                                        </Col>
                                    </If>
                                    </div>
                                </Row>


                                <If condition={registeredUser !== undefined }>
                                    <EditableInput
                                        label={`Registered Users ${registeredUser?.length}`}
                                        type='text'
                                        style={{maxHeight:"30vh",overflow:"scroll",padding:"10px"}}
                                        readOnly={true}
                                        editable={false}
                                        lines={registeredUser?.length}
                                        value={registeredUser.join('\n')}
                                    />

                                    {/*<EditableInput*/}
                                    {/*    label='Users'*/}
                                    {/*    type='text'*/}
                                    {/*    readOnly={true}*/}
                                    {/*    value=*/}
                                    {/*/>*/}

                                </If>
                                <Row>


                                </Row>
                            </Box>
                        </Col>
                        <If condition={groups !== undefined} >
                        <Col xs={12} md={12}>

                            <Box header={ <div className='flex items-center opacity-60 py-3'>
                                <FaIcon fa='s-people-group'/>
                                Teams!
                            </div>} className='user-layout'>
                                {
                                 groups.map((value, index, array) => {
                                     return (      <Row>
                                         <Col xs={24} md={24}>
                                             <EditableInput
                                                 readOnly={true}
                                                 label={value.teamName}
                                                 type='text'
                                                 value={value.teamMembers}
                                             />
                                         </Col>
                                         </Row>
                                             )
                                 })
                                }


                            </Box>
                        </Col>
                        </If>
                    </Row>

                </PanelLoader>

                <Footer/>
            </Container>
        );
    }

    function Create() {
        return (
            <Container className='user-layout-container'>
                <PanelLoader>
                    <Box
                        header={header}
                        className='user-layout'
                    >
                        <Row>
                            <Col xs={24} md={24}>
                                <EditableInput
                                    readOnly={status == "ACTIVE" || !mode.is.add}
                                    label='Datathon Name'
                                    type='text'
                                    value={name}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setName(event.target.value)
                                    }
                                />

                            </Col>
                            <Col xs={24} md={24}>
                                <EditableInput
                                    readOnly={status == "ACTIVE" || !mode.is.add}
                                    label='Number in the Team'
                                    type='number'
                                    value={count}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setCount(Number(event.target.value))
                                    }
                                />
                            </Col>

                        </Row>
                        <div className='user-layout-footer'>
                            <If condition={user?.role?.isSuper}>
                                <If condition={status != "ACTIVE"}>
                                    <Btn
                                        children='Save'
                                        onClick={newTeam}
                                        appearance='primary'
                                    />
                                    <Else>
                                        <Btn
                                            children='Generate Teams'
                                            onClick={generate}
                                            appearance='primary'
                                        />
                                    </Else>
                                </If>
                            </If>
                        </div>
                    </Box>

                </PanelLoader>

                <Footer/>
            </Container>
        );
    }

    if (mode.is.add) {
        return Create()
    } else {
        return Update()
    }
};

export default User;
