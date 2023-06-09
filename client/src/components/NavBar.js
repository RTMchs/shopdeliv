import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ACCOUNT_ROUTE, ADMIN_ORDERS, ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigation = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole('')
        user.setFirstName('')
        user.setLastName('')
        user.setMiddleName('')
        user.setEmail('')
        user.setAddress('')
        localStorage.clear()
    }

    if (user.isAuth) {
        return (
            <Navbar bg="dark" variant="dark">
                {user.role === 'ADMIN' ?
                    <Container>
                        <NavLink style={{color: 'white'}} to={ADMIN_ROUTE}>Exem Delivery</NavLink>

                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigation(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigation(ADMIN_ORDERS)}
                                className="ml-2"
                            >
                                Заказы
                            </Button>
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                Выйти
                            </Button>
                        </Nav>
                    </Container>
                    : user.role === 'COURIER' ?
                        <Container>
                            <NavLink style={{color: 'white'}} to={ACCOUNT_ROUTE}>Exem Delivery</NavLink>
                            <Nav className="ml-auto" style={{color: 'white'}}>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigation(ACCOUNT_ROUTE)}
                                >
                                    Личный Кабинет
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="ml-2"
                                >
                                    Выйти
                                </Button>
                            </Nav>
                        </Container> :
                        <Container>
                            <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Exem Delivery</NavLink>
                            <Nav className="ml-auto" style={{color: 'white'}}>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigation(ACCOUNT_ROUTE)}
                                >
                                    Личный Кабинет
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => navigation(BASKET_ROUTE)}
                                    className="ml-2"
                                >
                                    Корзина
                                </Button>
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                    className="ml-2"
                                >
                                    Выйти
                                </Button>
                            </Nav>
                        </Container>
                }
            </Navbar>

        );
    } else {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Exem Delivery</NavLink>
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigation(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                    }
                </Container>
            </Navbar>

        );
    }


});

export default NavBar;
