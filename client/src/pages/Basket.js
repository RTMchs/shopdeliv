import React, {useEffect} from 'react';
import {useContext} from 'react';
import {Context} from '..';
import {getBasket, getBasketDevices} from '../http/deviceAPI';
import {Button, Container} from 'react-bootstrap'
import {observer} from 'mobx-react-lite';
import BasketProduct from "../components/basketProduct";
import {useNavigate} from 'react-router-dom'
import {ORDER_ROUTE} from "../utils/consts";

export const getCartAfterDelete = (device) => {
    getBasket().then(data => device.setBaskets(data))
}

const Basket = observer(() => {

    const navigate = useNavigate();

    const {device} = useContext(Context)
    const {user} = useContext(Context)
    let price = 0;

    const click = async() => {

    }

    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [device])


    // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //
    device.basket.map(product =>
        price += product.device.price * product.amount
    )

    return (
        <Container
            className="flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина:</h1>

            {device.basket.map(product =>
                <BasketProduct key={product.id} product={product}/>
            )}
            {price !== 0 ?
                <div className='justify-content-between align-items-center w-100 m-auto'>
                    <div className="d-flex flex-row p-2 justify-content-between align-items-center mb-2">
                        <h4 className="pr-2 font-weight-light">Итого:</h4>
                        <h4 style={{color: ['#9f6788']}} className="pl-1">{price}₽</h4>
                    </div>
                    <Button
                        variant={"outline-success"}
                        className="font-weight-bold m-auto w-100"
                        onClick={() => navigate(ORDER_ROUTE)}>Оформить заказ</Button>
                </div>
                :
                <div style={{color: ['#9f6788']}}
                     className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <h1>Пусто</h1>
                </div>
            }

        </Container>
    );
});

export default Basket;
