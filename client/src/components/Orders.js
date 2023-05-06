import React, {useContext, useEffect} from 'react';
import {Row} from "react-bootstrap";
import {getOrders} from "../http/deviceAPI";
import {Context} from "../index";
import OrderItem from "./OrderItem";

const Orders = () => {
    const {device} = useContext(Context)

    useEffect(() => {
        getOrders().then(data => device.setOrders(data))
    }, [device.orders])

    if (device.orders.length > 0) {
        return (
            <div className='px-2 py-0'>
                <Row className="d-flex">
                    { device.orders.map(order =>
                        <OrderItem key={order.id} order={order}/>
                    )}
                </Row>
            </div>
        );
    } else {
        return (
            <div className='px-2 py-0'>
                <h5 className="p-5 text-center">
                    Вы ещё не сделали ни одной покупки
                </h5>
            </div>
        );
    }
};

export default Orders;