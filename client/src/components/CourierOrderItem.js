import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {COURIER_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const CourierOrderItem = ({order}) => {
    const [isHover, setIsHover] = useState(false)
    let date = new Date(order.updatedAt)
    let string = date.toLocaleString().toString()
    const navigate = useNavigate()

    const click = () => {
        navigate(COURIER_ROUTE + '/' + order.id)
    }

    return (
        <Card
            className="w-100 mb-1"
            onClick={click}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{cursor: 'pointer', borderColor: isHover ? ['#00CCBB'] : ['#c9c9c9']}}
        >
            <div className='w-100 d-flex '>
                <h6 className="pl-1">Получатель:</h6>
                <h6 style={{color: ['#80526c']}}
                    className="pl-1">{order.last_name} {order.first_name} {order.middle_name}</h6>
            </div>
            <div className='w-100 d-flex'>
                <h6 className="pl-1">Дата:</h6>
                <h6 style={{color: ['#80526c']}} className="pl-1"> {string} </h6>
            </div>
            <div className='w-100 d-flex'>
                <h6 className="pl-1">Адрес:</h6>
                <h6 style={{color: ['#80526c']}} className="pl-1"> {order.address} </h6>
            </div>
        </Card>
    );
};

export default CourierOrderItem;