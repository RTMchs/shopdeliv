import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchSearchedDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import SearchedDeviceList from "../components/SearchedDeviceList";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"


const Shop = observer(() => {
    const {device} = useContext(Context)
    const [isSearched, setIsSearched] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.selectedBrand.id, device.selectedType.id, device.page])

    const search = () => {
        if (value.length > 0) {
            fetchSearchedDevice(value).then(data => device.setSearchedDevices(data))
            setIsSearched(true)
        } else {
            setIsSearched(false)
        }
    }

    return (
        <Container className='min-vh-100'>
            <Form className='w-100 mx-auto d-flex mt-2'>
                <Form.Control
                    style={{height: 40}}
                    type='input'
                    placeholder='Поиск...'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <Button
                    variant='info'
                    style={{height: 40, background: ['#00CCBB']}}
                    className='ml-2'
                    onClick={search}
                >
                    <MagnifyingGlassIcon width={24} height={24}/>
                </Button>
                <Button
                    variant='info'
                    style={{height: 40}}
                    className='ml-2'
                    onClick={() => {
                        setIsSearched(false)
                        setValue('')
                    }}
                >
                    Очистить
                </Button>
            </Form>
            {
                isSearched
                    ?
                    <div className='py-3'>
                        <div className='w-25 mb-4 mt-2'>
                            <h3>Результаты поиска:</h3>
                        </div>
                        <Row>
                            <Col col={12}>
                                <SearchedDeviceList/>
                            </Col>
                        </Row>
                        <div className='w-25 mx-auto text-center mt-5'>
                            <Button
                                className='w-100'
                                variant='info'
                                style={{height: 40}}
                                onClick={() => setIsSearched(false)}
                            >
                                Вернуться
                            </Button>
                        </div>
                    </div>
                    :
                    <Row className="mt-2">
                        <Col md={3}>
                            <TypeBar/>
                        </Col>
                        <Col md={9}>
                            <BrandBar/>
                            <DeviceList/>
                            <Pages/>
                        </Col>
                    </Row>
            }
        </Container>
    );
});

export default Shop;
