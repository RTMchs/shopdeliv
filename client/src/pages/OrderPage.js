import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";
import { getOrderById, getOrderedDevices} from "../http/deviceAPI";
import {Context} from "../index";
import OrderedDevice from "../components/OrderedDevice";
import {Card} from "react-bootstrap";

const OrderPage = observer(() => {
    const {id} = useParams()
    const {device} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        getOrderById(id).then(data => device.setSelectedOrder(data))
        getOrderedDevices(id).then(data => device.setOrderedDevices(data))
    }, [device])

    let date = new Date(device.selectedOrder.updatedAt)
    let formatDate = date.toLocaleString().toString()
    if (device.selectedOrder.userId === user.id) {
        return (
            <div className="justify-content-between align-items-center mt-5 w-100 min-vh-100">
                <h2 style={{color: ['#80526c']}} className='m-auto w-50 text-center'>Заказ
                    № {device.selectedOrder.id}</h2>

                <Container className="justify-content-between align-items-center mt-1 w-100">
                    <div className='w-100 px-2 mx-auto my-4'>
                        <div className='d-flex w-100 mx-auto justify-content-center'>
                            <h6 className='text-center'>Получатель:</h6>
                            <h6 style={{color: ['#80526c']}} className='ml-2 text-center'
                            >
                                {device.selectedOrder.last_name} {device.selectedOrder.first_name} {device.selectedOrder.middle_name}
                            </h6>
                        </div>
                        <div className='d-flex w-100 justify-content-center'>
                            <h6 className='text-center'>Адрес:</h6>
                            <h6 style={{color: ['#80526c']}} className='ml-2'
                            >
                                {device.selectedOrder.address}
                            </h6>
                        </div>
                        <div className='d-flex w-100 justify-content-center'>
                            <h6 className='text-center'>Дата:</h6>
                            <h6 style={{color: ['#80526c']}} className='ml-2'
                            >
                                {formatDate}
                            </h6>
                        </div>
                    </div>
                    <Card className='w-75 px-1 mx-auto mt-3'>
                        <h6 className='m-0'>Товары:</h6>
                        <div>
                            {
                                device.orderedDevices.map(orderedDevice =>
                                    <OrderedDevice
                                        key={orderedDevice.id}
                                        orderedDevice={orderedDevice}
                                        status={device.selectedOrder.status}/>
                                )
                            }
                        </div>
                    </Card>
                </Container>
            </div>
        )
    } else {
        return (
            <div className="justify-content-between align-items-center mt-5 w-100 min-vh-100">
                <Container className="justify-content-between align-items-center mt-1 w-100">
                    <h1 className='w-100 text-center'>Нет доступа</h1>
                </Container>
            </div>
        )
    }
});

export default OrderPage;