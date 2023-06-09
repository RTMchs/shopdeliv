import React from 'react';
import {Card} from "react-bootstrap";
import PreparingOrders from "../components/PreparingOrders";
import DeliveringOrders from "../components/DeliveringOrders";
import EndedOrders from "../components/EndedOrders";

const AdminOrders = () => {
    return (
        <div className="justify-content-between align-items-center mt-3 w-100 min-vh-100">
            <h2 style={{color: ['#80526c']}} className='m-auto w-50 text-center'>Заказы</h2>
            <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8 overflow-auto'
            style={{maxHeight:300}}>
                <h5 className='text-center'>Обрабатываемые Заказы</h5>
                <PreparingOrders/>
            </Card>
            <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8 overflow-auto'
            style={{maxHeight:300}}>
                <h5 className='text-center'>Заказы в пути</h5>
                <DeliveringOrders/>
            </Card>
            <Card className='px-3 mx-auto mt-3 col-12 col-md-8 col-lg-8 overflow-auto'
            style={{maxHeight:300}}>
                <h5 className='text-center'>Завершённые заказы</h5>
                <EndedOrders/>
            </Card>
        </div>
    );
};

export default AdminOrders;