import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {Button, Card, Spinner} from "react-bootstrap";
import {fetchPersonal} from "../http/userAPI";
import {Context} from "../index";
import EditPersonal from "../components/modals/EditPersonal";
import Orders from "../components/Orders";
import {fetchLastOrder, getOrders} from "../http/deviceAPI";
import CourierOrders from "../components/CourierOrders";
import CurrentOrders from "../components/CurrentOrders";
import NewOrder from "../components/modals/NewOrder";

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

    const [newOrderVisible, setNewOrderVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false)
    if(user.role === 'COURIER') {
        const socket = new WebSocket('ws://localhost:5000/')
        socket.onopen = () => {
        }
        socket.onmessage = (event) => {
            console.log(event.data)
            fetchLastOrder().then(data => device.setSelectedOrder(data))

            setNewOrderVisible(true)
        }
    }

    if (user)
        return (
            <div className="justify-content-between align-items-center mt-3 w-100 min-vh-100">
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
                            style={{background: ['#00CCBB']}}
                        >
                            Изменить данные
                        </Button>
                    </Card>
                    {user.role === 'USER'
                        ?
                        <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8 overflow-auto'
                        style={{maxHeight:550}}>
                            <h5 className='text-center'>История заказов:</h5>
                            <Orders/>
                        </Card>
                        :
                        <div className='justify-content-between align-items-center mt-1 w-100 row mx-auto '>
                            <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8 overflow-auto' style={{maxHeight:550}}>
                                <h5 className='text-center'>Доступные заказы</h5>
                                <CourierOrders/>
                            </Card>
                            <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8 overflow-auto' style={{maxHeight:550}}>
                                <h5 className='text-center'>В процессе</h5>
                                <CurrentOrders/>
                            </Card>
                        </div>

                    }
                </Container>
                <EditPersonal show={editVisible} onHide={() => setEditVisible(false)}/>
                <NewOrder show={newOrderVisible} onHide={() => setNewOrderVisible(false)}/>
            </div>
        );
    else return <Spinner className='min-vh-100' animation={"grow"}/>;
});

export default Account;