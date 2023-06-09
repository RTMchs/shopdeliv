import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {changePersonal} from "../../http/userAPI";

const EditPersonal = ({show, onHide}) => {
    const {user} = useContext(Context)

    const [f, setF] = useState('')
    const [l, setL] = useState('')
    const [m, setM] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [er, setEr] = useState('')

    const getCurrent = () => {
        setF(user.firstName)
        setL(user.lastName)
        setM(user.middleName)
        setEmail(user.email)
        setAddress(user.address)
    }

    const clearAll = () => {
        setF('')
        setL('')
        setM('')
        setEmail('')
        setAddress('')
    }

    const editPersonal = async () => {
        if (f !== '' && l !== '' && m !== '' && email !== '' && address !== '') {
            await changePersonal(user.id, f, l, m, email, address)
            setEr('')
            onHide()
        } else {
            setEr('Введите все данные')
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
                    Изменить персональные данные
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={l}
                        onChange={e => setL(e.target.value)}
                        placeholder={"Фамилия"}
                        className='mb-2'
                    />
                    <Form.Control
                        value={f}
                        onChange={e => setF(e.target.value)}
                        placeholder={"Имя"}
                        className='mb-2'
                    />
                    <Form.Control
                        value={m}
                        onChange={e => setM(e.target.value)}
                        placeholder={"Отчество"}
                        className='mb-2'
                    />
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={"Email"}
                        className='mb-3'
                    />
                    <hr style={{borderColor: ['#80526c']}} className='mt-2 p-0 mb-1'/>
                    <h6 style={{color: ['#80526c']}} className='m-0 p-0 font-weight-light'>В формате: ул д кв</h6>
                    <h6 style={{color: ['#80526c']}} className='mt-0 mb-1 p-0'>Пример: ул Кирова д 1 кв 1</h6>
                    <Form.Control
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder={"Адрес"}
                        className='mb-2'
                    />
                    <Button
                        variant="info"
                        className='mb-2 w-100'
                        onClick={getCurrent}
                        style={{background: ['#00CCBB']}}
                    >
                        Показать текущие
                    </Button>
                    <Button
                        variant="info"
                        className='mb-2 w-100'
                        onClick={clearAll}

                    >
                        Очистить поля
                    </Button>
                    <h5 className='text-center' style={{color:"red"}}>{er}</h5>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Отмена</Button>
                <Button variant="outline-success" onClick={editPersonal}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPersonal;
