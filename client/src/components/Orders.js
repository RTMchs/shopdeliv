import React, {useContext, useEffect} from 'react';
import {getOrders} from "../http/deviceAPI";
import {Context} from "../index";
import OrderItem from "./OrderItem";
import {observer} from "mobx-react-lite";

const Orders = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        getOrders().then(data => device.setOrders(data))
        console.log(device.orders)
    }, [device])

    if (device.orders.length > 0) {
        return (
            <div className='px-2 py-0'>
                <div className='row'>
                    { device.orders.map(order =>
                        <OrderItem key={order.id} order={order}/>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className='px-2 py-0'>
                <h5 style={{color:'#80526c'}} className="p-5 text-center">
                    Вы ещё не сделали ни одной покупки
                </h5>
            </div>
        );
    }
});

export default Orders;