import React, {useState} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {getOneBrand} from "../http/deviceAPI";

const DeviceItem = ({device}) => {
    const [brandName, setBrandName] = useState('');
    const [isHover, setIsHover] = useState(false)
    const getBrandName = async (id) => {
        const data = await getOneBrand(id);
        setBrandName(data.name);
    }

    getBrandName(device.brandId);

    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className="mx-auto pb-1"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  style={{width: 130, cursor: 'pointer', borderColor: isHover ? ['#00CCBB'] : ['#c9c9c9']}}
            >
                <Image
                    width={120} height={120}
                    src={process.env.REACT_APP_API_URL + device.img}
                    className='m-1 border border-dark rounded'/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center w-100 px-1">
                    <div>{brandName}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div className='px-1'>{device.name}</div>
                <div className='d-flex'>
                    <div className="mt-1 d-flex justify-content-between align-items-center w-100 px-1">
                        <div>Цена:</div>
                        <div style={{color: ['#9f6788']}}>{device.price} ₽</div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
