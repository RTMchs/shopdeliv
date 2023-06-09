import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createCar, fetchCars} from "../../http/userAPI";

const CreateCar = ({show, onHide}) => {
    const {user} = useContext(Context)
    const [value, setValue] = useState('')
    const [er, setEr] = useState('')

    useEffect(() => {
        fetchCars().then(data => user.setCars(data))
    }, [user])

    const addCar = () => {
        if (value !== '') {
            createCar({name: value}).then(data => {
                setValue('')
                fetchCars().then(data => user.setCars(data))
                setEr('')
                onHide()
            })
        } else {
            setEr("Введите название Автомобиля!")
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
                    Добавить Автомобиль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название автомобиля"}
                    />
                    <h6 style={{color:"red"}}>{er}</h6>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCar}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCar;