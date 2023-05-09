import React, {useContext, useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Context} from "../index";
import Container from "react-bootstrap/Container";
import {fetchPersonal} from "../http/userAPI";
import {addToOrder, clearUserBasket, createOrder, getBasket, getOneOrder, getOrders} from "../http/deviceAPI";
import GoBack from "../components/modals/GoBack";
import {SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Order = () => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const [goBackVisible, setGoBackVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [device])
    const formAnOrder = async () => {
        await createOrder(user.id, f, l, m, addressRes)
        await getOneOrder().then(res => device.setSelectedOrder(res))
        device.basket.map(product => addToOrder(device.selectedOrder.id, product.deviceId, product.amount))
        await clearUserBasket(user.id)
        setGoBackVisible(true)
        await getOrders().then(data => device.setOrders(data))
    }

    useEffect(() => {
        fetchPersonal(user.id).then(data => {
            user.setFirstName(data.first_name)
            user.setLastName(data.last_name)
            user.setMiddleName(data.middle_name)
            user.setAddress(data.address)
        })
    }, [user])

    const [f, setF] = useState('')
    const [l, setL] = useState('')
    const [m, setM] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [addressRes, setAddressRes] = useState('')
    const [address, setAddress] = useState('')

    const getCurrentFio = () => {
        setF(user.firstName)
        setL(user.lastName)
        setM(user.middleName)
    }

    const getCurrentAddress = () => {
        setAddress(user.address)
    }

    const clearFio = () => {
        setF('')
        setL('')
        setM('')
    }

    const fetchData = () => {
        const API_KEY = '50bf572e3227ef84f9f04cd91719121f750b71cc'
        const formatAddress = 'г Киров ' + address
        let options = {
            method: "POST", mode: "cors", headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + API_KEY
            },
            body: JSON.stringify({query: formatAddress})
        }
        if (formatAddress !== 'г Киров ') {
            fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', options)
                .then(response => response.json())
                .then(result => {
                    const isHouse = result.suggestions[0].data.house
                    const isStreet = result.suggestions[0].data.street
                    const isFlat = result.suggestions[0].data.flat
                    if (isHouse && isStreet && isFlat) {
                        setIsActive(false)
                        setAddressRes(result.suggestions[0].value)
                    } else {
                        alert('Похоже, что вы ввели данные некорректно')
                        setIsActive(true)
                    }
                })
                .catch(error => {
                    alert("Похоже, что вы ввели данные некорректно")
                    setIsActive(true)
                });
        }
    }
    if (device.basket.length > 0) {
        return (
            <Container className='justify-content-center align-items-center'>
                <div className='px-5 py-3 w-75 m-auto justify-content-center align-items-center'>
                    <h4 style={{color: ['#80526c']}}>Укажите ФИО получателя:</h4>
                    <Form>
                        <Form.Control
                            value={l}
                            onChange={e => setL(e.target.value)}
                            placeholder={"Фамилия"}
                            className='mb-2'
                        />
                        <Form.Control
                            value={f}
                            onChange={e => setF(e.target.value)}
                            placeholder={"Имя"}
                            className='mb-2'
                        />
                        <Form.Control
                            value={m}
                            onChange={e => setM(e.target.value)}
                            placeholder={"Отчество"}
                            className='mb-2'
                        />

                        <Button
                            variant="outline-info"
                            className='mb-2 w-100'
                            onClick={getCurrentFio}
                            style={{borderColor:['#00CCBB']}}
                        >
                            Заполнить по умолчанию
                        </Button>
                        <Button
                            variant="outline-primary"
                            className='mb-2 w-100'
                            onClick={clearFio}
                        >
                            Очистить поля
                        </Button>
                    </Form>
                    <hr/>
                    <h4 style={{color: ['#80526c']}}>Укажите АДРЕС получателя:</h4>
                    <Form>
                        <h6 style={{color: ['#80526c']}} className='m-0 p-0 font-weight-light'>Адрес в формате: ул д
                            кв</h6>
                        <h6 style={{color: ['#80526c']}} className='mt-0 mb-1 p-0'>Пример: ул Кирова д 1 кв 1</h6>
                        <Form.Control
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder={"Адрес"}
                            className='mb-2'
                        />
                        <Button
                            variant="outline-info"
                            className='mb-2 w-100'
                            onClick={getCurrentAddress}
                        >
                            Заполнить из аккаунта
                        </Button>
                        <Button
                            variant='info'
                            className='mb-2 w-100'
                            onClick={fetchData}
                            style={{background:['#00CCBB']}}
                        >
                            Найти
                        </Button>
                        <h5 style={{color: ['#80526c']}} className='mt-0 mb-1 p-0'>{addressRes}</h5>
                        <Button
                            disabled={isActive}
                            variant='success'
                            className='mb-2 w-100'
                            onClick={formAnOrder}
                        >
                            Подтвердить
                        </Button>
                    </Form>
                </div>
                <GoBack show={goBackVisible} onHide={() => setGoBackVisible(false)}/>
            </Container>
        );
    } else {
        return (
            <Container className='justify-content-center align-items-center'>
                <h3 style={{color: ['#80526c']}} className='p-5 mt-5 w-100 text-center'>Ваша корзина пуста, невозможно сделать заказ!</h3>
                <div className='text-center w-100'>
                    <Button  variant='outline-success w-25' onClick={() => navigate(SHOP_ROUTE)}>На главную</Button>
                </div>
            </Container>
        )
    }
};

export default Order;