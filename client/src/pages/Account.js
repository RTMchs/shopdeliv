import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {Button, Card, Spinner} from "react-bootstrap";
import {fetchPersonal} from "../http/userAPI";
import {Context} from "../index";
import EditPersonal from "../components/modals/EditPersonal";
import Orders from "../components/Orders";
import {getOrders} from "../http/deviceAPI";

const Account = observer(() => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    getOrders().then(data => device.setOrders(data))
    fetchPersonal(user.id).then(data => {
        user.setFirstName(data.first_name)
        user.setLastName(data.last_name)
        user.setMiddleName(data.middle_name)
        user.setEmail(data.email)
        user.setAddress(data.address)
    })

    useEffect(() => {
        fetchPersonal(user.id).then(data => {
            user.setFirstName(data.first_name)
            user.setLastName(data.last_name)
            user.setMiddleName(data.middle_name)
            user.setEmail(data.email)
            user.setAddress(data.address)
        })
    }, [user])



    const [editVisible, setEditVisible] = useState(false)

    if (user)
    return (
        <div className="justify-content-between align-items-center mt-3 w-100">
            <h2 style={{color: ['#80526c']}} className='m-auto w-50 text-center'>Личный кабинет</h2>
            <Container className="justify-content-between align-items-center mt-1 p-5 w-100 row mx-auto">
                <Card className='col-12 col-md-8 col-lg-8 px-3 mx-auto row'>
                    <h5 className='text-center col align-self-center'>Данные:</h5>
                    <div className='d-flex w-100 flex-row p-2 justify-content-between align-items-center'>
                        <div className='ml-1 w-100 d-flex align-self-start'>
                            <h6>ФИО:</h6>
                            <h6 style={{color: ['#80526c']}}
                                className='ml-1 w-100'>{user.lastName} {user.firstName} {user.middleName}</h6>
                        </div>
                    </div>

                    <div className='d-flex w-100 flex-row p-2 justify-content-between align-items-center'>
                        <div className='ml-1 w-100 d-flex align-self-start'>
                            <h6>Email:</h6>
                            <h6 style={{color: ['#80526c']}} className='ml-1 w-100'>{user.email}</h6>
                        </div>
                    </div>
                    <div className='d-flex w-100 flex-row p-2 justify-content-between align-items-center'>
                        <div className='ml-1 w-100 d-flex  align-self-start'>
                            <h6>Адрес:</h6>
                            <h6 style={{color: ['#80526c']}} className='ml-1 w-100'>{user.address}</h6>
                        </div>
                    </div>
                    <Button
                        className='w-100 my-3'
                        onClick={() => setEditVisible(true)}
                        variant="info"
                        style={{background:['#00CCBB']}}
                    >
                        Изменить данные
                    </Button>

                </Card>
                <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8'>
                    <h5 className='text-center'>История заказов:</h5>
                    <Orders/>
                </Card>
                <EditPersonal show={editVisible} onHide={() => setEditVisible(false)}/>
            </Container>
        </div>
    );
    else return <Spinner animation={"grow"}/>;
});

export default Account;