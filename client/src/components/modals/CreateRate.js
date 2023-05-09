import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createRate} from "../../http/deviceAPI";

const CreateRate = ({show, onHide, deviceId}) => {
    const [value, setValue] = useState('')
    const [isSelected1, setIsSelected1] = useState(false)
    const [isSelected2, setIsSelected2] = useState(false)
    const [isSelected3, setIsSelected3] = useState(false)
    const [isSelected4, setIsSelected4] = useState(false)
    const [isSelected5, setIsSelected5] = useState(false)
    const [rate, setRate] = useState(0)

        const addRate = async() => {
            await createRate(rate, value, deviceId).then(data => console.log(data))
        }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оставить отзыв
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex my-2'>
                    <Button
                        variant='info'
                        style={{
                            background: isSelected1 ? ['purple'] : ['#00CCBB']
                        }}
                        onClick={() =>{
                            setRate(1)
                            setIsSelected1(true)
                            setIsSelected4(false)
                            setIsSelected3(false)
                            setIsSelected2(false)
                            setIsSelected5(false)
                        }}
                    >
                        1
                    </Button>
                    <Button className='ml-2'
                        variant='info'
                        style={{
                            background: isSelected2 ? ['purple'] : ['#00CCBB']
                        }}
                        onClick={() =>{
                            setRate(2)
                            setIsSelected2(true)
                            setIsSelected4(false)
                            setIsSelected3(false)
                            setIsSelected5(false)
                            setIsSelected1(false)
                        }}
                    >
                        2
                    </Button>
                    <Button className='ml-2'
                        variant='info'
                        style={{
                            background: isSelected3 ? ['purple'] : ['#00CCBB']
                        }}
                        onClick={() =>{
                            setRate(3)
                            setIsSelected3(true)
                            setIsSelected4(false)
                            setIsSelected5(false)
                            setIsSelected2(false)
                            setIsSelected1(false)
                        }}
                    >
                        3
                    </Button>
                    <Button className='ml-2'
                        variant='info'
                        style={{
                            background: isSelected4 ? ['purple'] : ['#00CCBB']
                        }}
                        onClick={() =>{
                            setRate(4)
                            setIsSelected4(true)
                            setIsSelected5(false)
                            setIsSelected3(false)
                            setIsSelected2(false)
                            setIsSelected1(false)
                        }}
                    >
                        4
                    </Button>
                    <Button className='ml-2'
                        variant='info'
                        style={{
                            background: isSelected5 ? ['purple'] : ['#00CCBB']
                        }}
                        onClick={() =>{
                            setRate(5)
                            setIsSelected5(true)
                            setIsSelected4(false)
                            setIsSelected3(false)
                            setIsSelected2(false)
                            setIsSelected1(false)
                        }}
                    >
                        5
                    </Button>
                </div>
                <Form>
                    <Form.Control as="textarea" rows={3}
                        value={value}
                        onChange={e => {
                            if (e.target.value.length <= 250) {
                                setValue(e.target.value)
                            }
                        }}
                        placeholder={"Комментарий"}
                    />
                    <div className='w-100 text-right'
                    style={{color: value.length < 250 ? ['#80526c'] : ['RED']}}>{value.length}/250</div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRate}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateRate;
