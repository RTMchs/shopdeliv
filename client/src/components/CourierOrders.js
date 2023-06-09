import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {fetchAvOrders} from "../http/deviceAPI";
import CourierOrderItem from "./CourierOrderItem";
import {observer} from "mobx-react-lite";

const CourierOrders = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchAvOrders().then(data => device.setAvOrders(data))
    }, [])

    if (device.avOrders.length > 0) {
        return (
            <div className='px-2 py-0'>
                <div className='row'>
                    {device.avOrders.map(order =>
                        <CourierOrderItem key={order.id} order={order}/>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className='px-2 py-0 align-items-center text-center justify-content-between w-100'>
                <h5 style={{color: '#80526c'}} className="px-5 mt-3">
                    На данный момент нет заказов
                </h5>
            </div>
        );
    }
});

export default CourierOrders;