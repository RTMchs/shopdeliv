import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import DeliveryMap from "../components/DeliveryMap";
import {Button, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {patchOrder} from "../http/deviceAPI";
import GoBack from "../components/modals/GoBack";

const CourierDelivery = () => {
    const {device} = useContext(Context)
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [goBackVisible, setGoBackVisible] = useState(false)
    const patchStatus = async () => {
       await patchOrder(device.selectedOrder.id, 'ENDED').then(data => setGoBackVisible(true))
    }

    const fetchCoords = () => {
        const API_KEY = '50bf572e3227ef84f9f04cd91719121f750b71cc'
        const formatAddress = device.selectedOrder.address
        let options = {
            method: "POST", mode: "cors", headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + API_KEY
            },
            body: JSON.stringify({query: formatAddress})
        }
        fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', options)
            .then(response => response.json())
            .then(result => {
                setLat(Number(result.suggestions[0].data.geo_lat))
                setLon(Number(result.suggestions[0].data.geo_lon))
            })
            .catch(error => {
                console.log(error)
            });
    }
    fetchCoords()

    useEffect(() => {
        fetchCoords()
    }, [device.selectedOrder, device])
    if (device.selectedOrder.id) {
        if (lat !== 0 && lon !== 0) {
            return (
                <Container className='min-vh-100 max-vh-100'>
                    <h3 style={{color: ['#80526c']}} className='w-50 text-center mt-3 mx-auto'>
                        Заказ № {device.selectedOrder.id}
                    </h3>
                    <div className=' w-100 mx-auto justify-content-center mt-3'>
                        <h5 className='text-center'>Получатель:</h5>
                        <h4 style={{color: ['#80526c']}} className='ml-2 text-center'
                        >
                            {device.selectedOrder.last_name} {device.selectedOrder.first_name} {device.selectedOrder.middle_name}
                        </h4>
                    </div>
                    <div className='w-100 justify-content-center mt-3'>
                        <h5 className='text-center'>Адрес:</h5>
                        <h4 style={{color: ['#80526c']}} className='ml-2 text-center'
                        >
                            {device.selectedOrder.address}
                        </h4>
                    </div>
                    <h4 className='mt-4 text-center'>Примерный маршрут</h4>
                    <div className='w-100 px-3 mt-4'>
                        <DeliveryMap lat={lat} lon={lon}/>
                    </div>
                    <div className='mt-5 mx-auto text-center'>
                        <Button
                            variant='info'
                            style={{width: 300, height:50}}
                            onClick={patchStatus}
                        >
                            Товар доставлен
                        </Button>
                    </div>
                    <GoBack show={goBackVisible} onHide={() => setGoBackVisible(false)} message='Хорошая работа!'/>
                </Container>
            );
        } else {
            return (
                <div className="justify-content-between align-items-center mt-5 w-100 min-vh-100">
                    <Container className="justify-content-between align-items-center mt-1 w-100">
                        <Spinner animation={"grow"}/>
                    </Container>
                </div>
            );
        }
    } else {
        return (
            <div className="justify-content-between align-items-center mt-5 w-100 min-vh-100">
                <Container className="justify-content-between align-items-center mt-1 w-100">
                    <h1 className='w-100 text-center'>Нет доступа</h1>
                </Container>
            </div>
        );
    }
};

export default CourierDelivery;