import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {fetchTypes, deleteType} from "../../http/deviceAPI";
import {Context} from "../../index";

const DeleteType = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [id, setId] = useState(0)
    const [typeName, setTypeName] = useState('')

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
    }, [device])

    const deleteSelectedType = async () => {

        try {
            if (id !== 0 && typeName !== '') {
                await deleteType(id)
                setId(0)
                setTypeName('')
                fetchTypes().then(data => device.setTypes(data))
                device.setSelectedType({})
                alert ('Тип удалён')
                onHide()
            } else {
                alert("Невозможно провести операцию!")
            }
        } catch (e) {
            alert(e.message)
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
                    Удалить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2 text-center">
                        <Dropdown.Toggle>{typeName || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={ () => {
                                        device.setSelectedType(type);
                                        setTypeName(device.selectedType.name)
                                        setId(device.selectedType.id)
                                    }
                                    }
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={deleteSelectedType}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;
