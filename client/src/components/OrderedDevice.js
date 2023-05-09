import React, {useEffect, useState} from 'react';
import {Card, Image, Spinner, Col} from "react-bootstrap";
import {fetchOneDevice, getOneBrand} from "../http/deviceAPI";
import star from "../assets/star.png";
import CreateRate from "./modals/CreateRate";

const OrderedDevice = ({orderedDevice}) => {
    const [device, setDevice] = useState()
    const [brandName, setBrandName] = useState('');
    const [rateVisible, setRateVisible] = useState(false)
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        fetchOneDevice(orderedDevice.deviceId).then(data => setDevice(data))
    }, [])

    if (device) {
        const getBrandName = async (id) => {
            const data = await getOneBrand(id);
            setBrandName(data.name);
        }
        let sum = device.price * orderedDevice.amount
        getBrandName(device.brandId);
        return (
            <Card className='my-2 w-100'>
                <div className='d-flex'>
                    <Image
                        className='border border-dark rounded m-1'
                        width={70} height={75}
                        src={process.env.REACT_APP_API_URL + device.img}
                    />
                    <div className='ml-2 w-50'>
                        <h6 className='m-0'>{brandName} {device.name}</h6>
                        <div className='text-black-50 mt-1'>Код товара: {device.id}</div>
                        <h6
                            style={{
                                cursor: 'pointer',
                                color: isHover ? ['#00CCBB'] : ['#80526c']
                            }}
                            className='mt-1'
                            onClick={() => setRateVisible(true)}
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            Оставить отзыв
                        </h6>
                    </div>
                    <div className='ml-2 w-50 pr-1'>
                        <div className='text-right'>Цена: {device.price}₽</div>
                        <div className='text-right text-black-50'>{orderedDevice.amount}шт x {device.price}₽</div>
                        <div className='text-right text-black-50'>Итого: {sum}₽</div>
                    </div>
                </div>
                <CreateRate show={rateVisible} onHide={() => setRateVisible(false)} deviceId={device.id}/>
            </Card>
        );
    } else {
        return <Spinner animation={"grow"}/>
    }
}

export default OrderedDevice;
