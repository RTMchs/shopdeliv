import React, {useState} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {getOneBrand} from "../http/deviceAPI";
import {StarIcon} from "@heroicons/react/24/solid";

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
        <Col md={4} lg={3} sm={6} className="mt-3 col-12">
            <Card className="mx-auto pb-1"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  style={{width: 130, cursor: 'pointer', borderColor: isHover ? ['#00CCBB'] : ['#c9c9c9']}}
                  onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
            >
                <Image
                    width={120} height={120}
                    src={process.env.REACT_APP_API_URL + device.img}
                    className='m-1 rounded'/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center w-100 px-1">
                    <div>{brandName}</div>
                    <div className="d-flex align-items-center" style={{color: ['#80526c']}}>
                        <div>{device.rating}<StarIcon width={18} height={18} className='pb-1'/></div>
                    </div>
                </div>
                <div className='px-1'>{device.name}</div>
                <div className='d-flex'>
                    <div className="mt-1 d-flex justify-content-between align-items-center w-100 px-1">
                        <div>Цена:</div>
                        <div style={{color: ['#80526c']}}>{device.price} ₽</div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
