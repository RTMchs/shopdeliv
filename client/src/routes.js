import Admin from "./pages/Admin";
import {
    ACCOUNT_ROUTE,
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    ORDER_ITEM_ROUTE,
    ORDER_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    COURIER_ROUTE,
    COURIER_DELIVERY_ROUTE,
    ADMIN_ORDERS
} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Order from "./pages/Order";
import DevicePage from "./pages/DevicePage";
import Account from "./pages/Account";
import OrderPage from "./pages/OrderPage";
import CourierPage from "./pages/CourierPage";
import CourierDelivery from "./pages/CourierDelivery";
import AdminOrders from "./pages/AdminOrders";


export const adminRoute = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_ORDERS,
        Component: AdminOrders
    }
]

export const courierRoute = [
    {
        path: COURIER_ROUTE  + '/:id',
        Component: CourierPage
    },
    {
        path: COURIER_DELIVERY_ROUTE,
        Component: CourierDelivery
    }
]

export const accountRoute = [
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    }
]

export const authRoute = [
    {
        path: ORDER_ROUTE,
        Component: Order
    },
    {
        path: ORDER_ITEM_ROUTE + '/:id',
        Component: OrderPage
    }
]
export const clientRoute = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    }
]
