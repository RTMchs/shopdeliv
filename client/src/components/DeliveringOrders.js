import React, {useContext, useEffect} from 'react';
import {getDeliveringOrders} from "../http/deviceAPI";
import {Context} from "../index";
import OrderItem from "./OrderItem";
import {observer} from "mobx-react-lite";

const DeliveringOrders = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        getDeliveringOrders().then(data => device.setCurOrders(data))
    }, [device])

    if (device.curOrders.length > 0) {
        return (
            <div className='px-2 py-0'>
                <div className='row'>
                    { device.curOrders.map(order =>
                        <OrderItem key={order.id} order={order}/>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className='px-2 py-0 align-items-center text-center justify-content-between w-100'>
                <h5 style={{color:'#80526c'}} className="p-5 text-center">
                    На данный момент нет заказов
                </h5>
            </div>
        );
    }
});

export default DeliveringOrders;