import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {
    fetchTypes,
    deleteDevice,
    fetchBrands,
    fetchAllDevices,
    deleteFromAllBaskets,
    deleteFromOrder
} from "../../http/deviceAPI";
import {Context} from "../../index";

export const fetchAll = (device) => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchAllDevices().then(data => {
        device.setDevices(data.rows)
    })
}

const DeleteDevice = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [id, setId] = useState(0)
    const [deviceName, setDeviceName] = useState('')
    const [er, setEr] = useState('')

    useEffect(() => {
        fetchAll(device)
    }, [device])

    fetchAll(device)

    const deleteSelectedDevice = async () => {
        try {
            if (id !== 0 && deviceName !== '') {
                await deleteFromAllBaskets(id)
                await deleteFromOrder(id)
                await deleteDevice(id)
                setId(0)
                setDeviceName('')
                fetchAll(device)
                device.setSelectedBrand({})
                device.setSelectedType({})
                setEr('')
                onHide()

            } else {
                setEr("Невозможно провести операцию!")
            }
        } catch (e) {
            setEr(e.message)
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2 text-center">
                        <Dropdown.Toggle>{deviceName || "Выберите товар"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.devices.map(device =>
                                <Dropdown.Item
                                    onClick={ () => {
                                        setId(device.id)
                                        setDeviceName(device.name)
                                    }
                                    }
                                    key={device.id}
                                >
                                    {device.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <h5 style={{color:"red"}} className='text-center'>{er}</h5>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={deleteSelectedDevice}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDevice;
