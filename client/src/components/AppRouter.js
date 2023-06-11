import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoute, publicRoutes, adminRoute, courierRoute, clientRoute, accountRoute} from "../routes";
import {ACCOUNT_ROUTE, ADMIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.role === 'ADMIN' && adminRoute.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.role === 'COURIER' && courierRoute.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && authRoute.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && user.role !== 'ADMIN' && accountRoute.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.role === 'USER' && clientRoute.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.role !== 'ADMIN' && user.role !== 'COURIER' && publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            { user.role === 'COURIER' ?
                <Route path='*' element={<Navigate to={ACCOUNT_ROUTE}/>}/> :
                user.role === 'ADMIN' ?
                    <Route path='*' element={<Navigate to={ADMIN_ROUTE}/>}/> :
                    <Route path='*' element={<Navigate to={SHOP_ROUTE}/>}/>
            }
        </Routes>
    );
});

export default AppRouter;
