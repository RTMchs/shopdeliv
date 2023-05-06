import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";


const GoBack = ({show, onHide}) => {
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
                <h4 style={{color: ['#9f6788']}} className="pl-1">Ваш заказ принят!</h4>
                <Button variant='outline-success' onClick={() => navigate(SHOP_ROUTE)}>На главную!</Button>
            </Modal.Body>
        </Modal>
    );
};

export default GoBack;
