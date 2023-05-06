import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createType, fetchTypes} from "../../http/deviceAPI";
import {Context} from "../../index";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const {device} = useContext(Context)

    const addType = () => {
        if (value !== '') {
            createType({name: value}).then(data => {
                setValue('')
                fetchTypes().then(data => device.setTypes(data))
                device.setSelectedType({})
                alert ('Тип успешно создан')
                onHide()
            })
        } else {
            alert("Введите название типа товара!")
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
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
