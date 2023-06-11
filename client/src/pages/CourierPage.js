import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate, useParams} from "react-router-dom";
import {getOrderById, getOrderedDevices, patchOrder} from "../http/deviceAPI";
import {Context} from "../index";
import OrderedDevice from "../components/OrderedDevice";
import {Button, Card, Dropdown, Form} from "react-bootstrap";
import {COURIER_DELIVERY_ROUTE} from "../utils/consts";
import {fetchCars, getOneCar} from "../http/userAPI";

const CourierPage = observer(() => {
    const {id} = useParams()
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const [carName, setCarName] = useState('')
    const [err, setErr] = useState('')
    const [currentCar, setCurrentCar] = useState({});
    const navigate = useNavigate()

    const patchStatus = async () => {
        if (device.selectedOrder.status === 'PREPARING') {
            if (user.selectedCar.id && carName !== '') {
                patchOrder(device.selectedOrder.id, 'DELIVERING', user.selectedCar.id).then(data => navigate(COURIER_DELIVERY_ROUTE))
            } else {
                setErr('Выберите авто для принятия заказа!')
            }
        } else {
            navigate(COURIER_DELIVERY_ROUTE)
        }
    }

    useEffect(() => {
        getOrderById(id).then(data => device.setSelectedOrder(data))
        getOrderedDevices(id).then(data => device.setOrderedDevices(data))
        fetchCars().then(data => user.setCars(data))

    }, [device, user])

    useEffect(() => {
        if (device.selectedOrder.carId) {
            getOneCar(device.selectedOrder.carId).then(data => setCurrentCar(data))
        }
    }, [device.selectedOrder])

    if (device.selectedOrder) {
        let date = new Date(device.selectedOrder.updatedAt)
        let formatDate = date.toLocaleString().toString()

        if (user.role === 'COURIER' && device.selectedOrder.status !== 'ENDED') {
            return (
                <div className="justify-content-between align-items-center mt-5 w-100 min-vh-100">
                    <h2 style={{color: ['#80526c']}} className='m-auto w-50 text-center'>
                        Заказ № {device.selectedOrder.id}
                    </h2>

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
                                <h6 className='text-center'>Адрес доставки:</h6>
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
                            <div className='d-flex w-100 justify-content-center'>
                                <h6 className='text-center'>Автомобиль:</h6>
                                <h6 style={{color: ['#80526c']}} className='ml-2'
                                >
                                    {currentCar.name}
                                </h6>
                            </div>
                        </div>
                        <Card className='col-12 col-sm-11 col-md-10 col-lg-10 px-1 mx-auto mt-3'>
                            <h6 className='m-0'>Товары:</h6>
                            <div>
                                {
                                    device.orderedDevices.map(orderedDevice =>
                                        <OrderedDevice
                                            key={orderedDevice.id}
                                            orderedDevice={orderedDevice}
                                            status={device.selectedOrder.status}
                                            role={user.role}
                                        />
                                    )
                                }
                            </div>
                        </Card>
                        <div className='col-12 col-sm-11 col-md-10 col-lg-10 px-1 mx-auto mt-4 text-center'>
                            <Form className='w-100 d-flex'>
                                <div className='d-flex mx-auto'>
                                    <Dropdown className="text-center mx-2"
                                              style={{minWidth: 300}}>
                                        { !device.selectedOrder.carId ?
                                            <Dropdown.Toggle variant='outline-info' style={{
                                            width: 300,
                                            height: 40
                                        }}>{carName || "Выберите авто"}</Dropdown.Toggle>
                                        :
                                            <Dropdown.Toggle variant='outline-info' disabled={true} style={{
                                                width: 300,
                                                height: 40
                                            }}>{currentCar.name}</Dropdown.Toggle>
                                        }
                                        <Dropdown.Menu style={{minWidth: 300}}>
                                            {user.cars.map(car =>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        user.setSelectedCar(car);
                                                        setCarName(user.selectedCar.name)
                                                        setErr('')
                                                    }
                                                    }
                                                    key={car.id}
                                                >
                                                    {car.name}
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button
                                        className='mx-2'
                                        variant='outline-success'
                                        style={{width: 300, height: 40}}
                                        onClick={patchStatus}
                                    >
                                        {device.selectedOrder.status === 'PREPARING' ? 'Принять' : 'Перейти к доставке'}
                                    </Button>
                                </div>
                            </Form>
                            <h5 style={{color: "red"}} className='text-center mt-4'>{err}</h5>

                        </div>

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
    } else {
        return (
            <div className='vh-100 align-middle d-flex'>
                <h4 style={{color: '#80526c'}} className='m-auto text-center'>
                    Такого Заказа не существует
                </h4>
            </div>
        )
    }
});

export default CourierPage;