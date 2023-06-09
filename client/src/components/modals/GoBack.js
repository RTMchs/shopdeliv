import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";


const GoBack = ({show, onHide, message}) => {
    const navigate = useNavigate();
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Отлично!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{color: ['#80526c']}} className="pl-1">{message}</h4>
                <Button variant='outline-success' onClick={() => navigate(SHOP_ROUTE)}>На главную!</Button>
            </Modal.Body>
        </Modal>
    );
};

export default GoBack;
