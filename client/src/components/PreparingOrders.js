import React, {useContext, useEffect} from 'react';
import {getPreparingOrders} from "../http/deviceAPI";
import {Context} from "../index";
import OrderItem from "./OrderItem";
import {observer} from "mobx-react-lite";

const PreparingOrders = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        getPreparingOrders().then(data => device.setAvOrders(data))
    }, [device])
    if (device.avOrders.length > 0) {
        return (
            <div className='px-2 py-0'>
                <div className='row'>
                    { device.avOrders.map(order =>
                        <OrderItem key={order.id} order={order}/>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className='px-2 py-0'>
                <h5 style={{color:'#80526c'}} className="p-5 text-center">
                   На данный момент нет заказов
                </h5>
            </div>
        );
    }
});

export default PreparingOrders;