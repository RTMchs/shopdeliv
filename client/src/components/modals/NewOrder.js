import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {COURIER_ROUTE} from "../../utils/consts";

const NewOrder = ({show, onHide}) => {
    const {device} = useContext(Context);
    const navigate = useNavigate();
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Новый заказ!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Получатель: {device.selectedOrder.first_name} {device.selectedOrder.last_name} {device.selectedOrder.middle_name}</h5>
                <h5>Адрес: {device.selectedOrder.address}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Скрыть</Button>
                <Button variant="outline-success" onClick={() =>
                    navigate(COURIER_ROUTE + '/' + device.selectedOrder.id)
                }>Подробнее</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewOrder;