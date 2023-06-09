import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice, addToBasket, getAllRates} from "../http/deviceAPI";
import {StarIcon} from "@heroicons/react/24/solid";
import {Context} from "../index";
import Rate from "../components/Rate";

const DevicePage = () => {
    const {device} = useContext(Context)
    const [oneDevice, setOneDevice] = useState({info: []})
    const [isRatingsEmpty, setIsRatingsEmpty] = useState(false)
    const [er, setEr] = useState('')
    const {id} = useParams()
    const [count, setCount] = useState(1)

    const getRates = async() => {
        await getAllRates(id).then(data => device.setRatings(data))
        setIsRatingsEmpty(device.ratings.length > 0)
    }

    useEffect(() => {
        fetchOneDevice(id).then(data => setOneDevice(data))
        getRates()
    }, [device])

    const addIntoBasket = () => {
        setCount(count + 1)
        const formData = new FormData()
        formData.append('deviceId', id)
        addToBasket(formData).then(data =>
            setEr(`Товар ` + oneDevice.name + ` был добавлен в вашу корзину!` + ` x` + count))
    }
    if (oneDevice) {
        if (oneDevice.name) {
            return (
                <Container className="mt-3 min-vh-100">

                    <Row className='justify-content-center d-flex'>
                        <Col className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <div className="d-flex flex-column align-items-center my-2">
                                <Image width={300} height={300}
                                       src={process.env.REACT_APP_API_URL + oneDevice.img}
                                       className='rounded'
                                />
                            </div>
                        </Col>
                        <Col className='col-lg-4 col-md-6 col-sm-12 col-12'>
                            <div className="d-flex flex-column align-items-center my-2">

                                <div
                                    className="d-flex flex-column align-items-center justify-content-around"
                                    style={{width: 300, height: 300, fontSize: 32}}
                                >
                                    <h1 style={{color: ['#80526c']}} className='w-100 text-center'>{oneDevice.name}</h1>
                                    <div className='d-flex'>
                                        <h3>Цена:</h3>
                                        <h3 style={{color: ['#80526c']}} className='ml-2'>{oneDevice.price}₽</h3>
                                    </div>
                                    <div className='d-flex'>
                                        <h3>Оценка:</h3>
                                        <h3 style={{color: ['#80526c']}} className='ml-2'>
                                            {oneDevice.rating}<StarIcon width={28} height={28} className='pb-1'/>
                                        </h3>
                                    </div>
                                    <Button
                                        variant="info"
                                        onClick={addIntoBasket}
                                        style={{background: ['#00CCBB']}}
                                    >
                                        Добавить в корзину
                                    </Button>
                                    <h5 style={{color: "#80526c"}} className='text-center px-1'>{er}</h5>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className='justify-content-center'>
                        <Col className='col-lg-10 col-md-10 col-sm-12 col-12'>
                            <div className="d-flex flex-column align-items-center my-2">
                                <Card
                                    className="d-flex w-100 flex-column align-items-center justify-content-around"
                                    style={{height: 300, fontSize: 32, border: '5px solid lightgray'}}
                                >
                                    <div className="d-flex flex-column px-2 py-2 w-100 overflow-auto">
                                        <h4 className='text-center mb-2'>Характеристики:</h4>
                                        {oneDevice.info.map((info) =>
                                            <div
                                                key={info.id}
                                                className='rounded px-1 my-1 d-flex'
                                                style={{
                                                    borderBottom: '1px solid lightgray',
                                                }}
                                            >

                                                <h6 className='my-0 py-2 text-left w-50'>{info.title}:</h6>
                                                <h6
                                                    className='my-0 py-2 text-right w-50'
                                                    style={{color: ['#80526c']}}
                                                >
                                                    {info.description}
                                                </h6>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>

                    <Row className='justify-content-center'>
                        <Col className='col-lg-10 col-md-10 col-sm-12 col-12'>
                            <div className="d-flex flex-column align-items-center my-2">
                                <Card
                                    className="d-flex flex-column align-items-center w-100 justify-content-around"
                                    style={{height: 400, fontSize: 32, border: '5px solid lightgray'}}
                                >
                                    <div className="d-flex flex-column px-2 w-100 overflow-auto">
                                        <h4 className='mb-2 text-center '>Отзывы:</h4>
                                        {isRatingsEmpty ? device.ratings.map(rating =>
                                                <Rate
                                                    key={rating.id}
                                                    rating={rating}
                                                    className='py-2 rounded px-1'
                                                />
                                            )
                                            :
                                            <h5 style={{color: '#80526c'}} className='text-center p-4'>Отзывов нет</h5>
                                        }
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>

                </Container>
            );
        } else {
            return <Spinner animation={"grow"} className='w-100 vh-100'/>
        }
    } else {
        return (
            <div className='vh-100 align-middle d-flex'>
                <h4 style={{ color: '#80526c'}} className='m-auto text-center'>
                Такого Товара не существует
                </h4>
            </div>
        )
    }
};

export default DevicePage;
