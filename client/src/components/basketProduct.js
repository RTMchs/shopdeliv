import React, {useContext, useEffect} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {deleteFromBasket, removeFromBasket} from "../http/deviceAPI";
import {getCartAfterDelete} from "../pages/Basket";
import {Context} from "../index";

const BasketProduct = ({product}) => {
    const {device} = useContext(Context);
    let am = product.amount;

    useEffect( () => {
        am = product.amount
    }, [device])

    const deleteItem = async() => {
        if (am > 1){
            am = am - 1
            await removeFromBasket(product.id)
            getCartAfterDelete(device)
        } else
        {
            await deleteFromBasket(product.id)
            getCartAfterDelete(device)
            am = product.amount
        }

    }

    return (
        <Card className="d-flex w-100 p-0 justify-content-center mb-2" key={product.id}>
            <div className="d-flex w-100">
                <Col>
                    <div style={{height: 50}} className="d-flex flex-row flex-grow-1 align-items-center">
                        <h4 style={{width:50, color: ['#80526c']}} className="text-color pt-1 pr-1">x{am}</h4>
                        <Image className='rounded' src={process.env.REACT_APP_API_URL + product.device.img} width={45} height={45} />
                        <h4 className="pt-1 ml-3 font-weight-light">{product.device.name}</h4>
                    </div>
                </Col>
                <Col>
                    <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                        <h4 style={{color: ['#80526c']}} className="pt-2">{product.device.price}₽</h4>

                        <Button variant={'outline-info'}
                                style={{borderColor:['#00CCBB']}}
                                className='ml-2' onClick={deleteItem}>
                            <Image src={process.env.REACT_APP_API_URL + 'minus.png'} width={25} height={25} />
                        </Button>
                    </div>

                </Col>
            </div>

        </Card>
    );
};

export default BasketProduct;