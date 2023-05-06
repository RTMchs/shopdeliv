import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createBrand,  fetchBrands} from "../../http/deviceAPI";
import {Context} from "../../index";

const CreateBrand = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [value, setValue] = useState('')

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
    }, [device])

    const addBrand = () => {
        if (value !== '') {
            createBrand({name: value}).then(data => {
                setValue('')
                fetchBrands().then(data => device.setBrands(data))
                device.setSelectedBrand({})
                alert ('Брэнд успешно создан')
                onHide()
            })

        } else {
            alert("Введите название брэнда!")
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
                    Добавить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название брэнда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
