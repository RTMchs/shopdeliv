import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const registration = async (email, password, role) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchPersonal = async (userId) => {
    const {data} = await $authHost.get('api/user/' + userId)
    return data
}

export const changePersonal = async (userId, fName, lName, mName, email, address) => {
    const {data} = await $authHost.patch('api/user/' + userId,
        {
            first_name: fName,
            last_name: lName,
            middle_name: mName,
            email: email,
            address: address
        })
    return data
}

export const createCar = async (car) => {
    const {data} = await $authHost.post('api/car', car)
    return data
}

export const fetchCars = async () => {
    const {data} = await $host.get('api/car',)
    return data
}

export const getOneCar = async (id) => {
    const {data} = await $host.get('api/car/' + id)
    return data
}

