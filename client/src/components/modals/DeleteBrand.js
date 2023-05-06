import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {deleteBrand, fetchBrands} from "../../http/deviceAPI";
import {Context} from "../../index";

const DeleteBrand = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [id, setId] = useState(0)
    const [brandName, setBrandName] = useState('')

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
    }, [device])

    const deleteSelectedBrand = async () => {
        try {
            if (id !== 0 && brandName !== '') {
                await deleteBrand(id)
                setId(0)
                setBrandName('')
                fetchBrands().then(data => device.setBrands(data))
                device.setSelectedBrand({})
                alert ('Брэнд удалён')
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
                    Удалить брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2 text-center">
                        <Dropdown.Toggle>{brandName || "Выберите брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={ () => {
                                        device.setSelectedBrand(brand);
                                        setBrandName(device.selectedBrand.name)
                                        setId(device.selectedBrand.id)
                                    }
                                }
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={deleteSelectedBrand}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrand;
