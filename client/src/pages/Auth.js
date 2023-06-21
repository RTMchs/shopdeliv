import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigation = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [er, setEr] = useState('')

    const click = async (role) => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                if (role) {
                    data = await registration(email, password, role);
                }
            }
            setEr('')
            user.setUser(data)
            user.setIsAuth(true)
            user.setRole(data.role)
            navigation(SHOP_ROUTE)
            window.location.reload()
        } catch (e) {
            setEr(e.response.data.message)
        }

    }
    if (!user.role) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center min-vh-100"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <h5 style={{color: "red"}} className='text-center'>{er}</h5>
                        <Row className="d-flex justify-content-between mt-1 mb-1 pl-3 pr-3">
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь.</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите.</NavLink>
                                </div>
                            }
                        </Row>
                        {isLogin ?
                            <Button variant={"outline-success"} onClick={click}> Войти </Button>
                            :
                            <Row className="justify-content-between mt-1 mb-1 pl-3 pr-3">
                                <Button
                                    variant={"outline-success"}
                                    onClick={() => {
                                        click("COURIER")
                                    }
                                    }
                                    className='w-100 mt-2'
                                    style={{minWidth: 125}}
                                >
                                    Зарегистрироваться как Курьер
                                </Button>
                                <Button
                                    variant={"outline-info"}
                                    onClick={() => {
                                        click("USER")
                                    }
                                    }
                                    className='w-100 mt-2'
                                    style={{minWidth: 125}}
                                >
                                    Зарегистрироваться как Покупатель
                                </Button>
                            </Row>
                        }

                    </Form>
                </Card>
            </Container>
        );
    } else {
        return (
            <div className='vh-100 align-middle d-flex'>
                <h4 style={{color: '#80526c'}} className='m-auto text-center'>
                    Вы уже авторизованы
                </h4>
            </div>
        )
    }
});

export default Auth;
