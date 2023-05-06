import {$authHost, $host} from "./index";


//------------------------------ТИПЫ------------------------------//
export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (typeId) => {
    const {data} = await $authHost.delete('api/type/' + typeId)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
//------------------------------ТИПЫ------------------------------//

//------------------------------БРЭНДЫ------------------------------//
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (brandId) => {
    const {data} = await $authHost.delete('api/brand/' + brandId)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand',)
    return data
}

export const getOneBrand = async (id) => {
    const {data} = await $host.get('api/brand/' + id)
    return data
}
//------------------------------БРЭНДЫ------------------------------//


//------------------------------ТОВАРЫ------------------------------//
export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const deleteDevice = async (deviceId) => {
    const {data} = await $authHost.delete('api/device/' + deviceId)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const fetchAllDevices = async () => {
    const {data} = await $host.get('api/device')
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
//------------------------------ТОВАРЫ------------------------------//

//------------------------------КОРЗИНА------------------------------//
export const addToBasket = async (deviceId) => {
    const {response} = await $authHost.post('api/basket', deviceId)
    return response
}

export const removeFromBasket = async (id) => {
    const {response} = await $authHost.patch('api/basket/' + id)
    return response
}

export const deleteFromBasket = async (id) => {
    const {response} = await $authHost.delete('api/basket/' + id)
    return response
}

export const clearUserBasket = async (userId) => {
    const {response} = await $authHost.delete('api/basket', {params: {userId: userId}})
    return response
}

export const deleteFromAllBaskets = async (id) => {
    const {response} = await $authHost.delete('api/delbasket/' + id)
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

export const getBasketDevices = async (basketId) => {
    const {data} = await $authHost.get('api/delbasket', {params: {basketId: basketId}})
    return data
}
//------------------------------КОРЗИНА------------------------------//

//------------------------------ЗАКАЗЫ------------------------------//
export const getOrders = async () => {
    const {data} = await $authHost.get('api/order')
    return data
}

export const getOneOrder = async () => {
    const {data} = await $authHost.get('api/ordevice')
    return data
}

export const getOrderById= async (id) => {
    const {data} = await $authHost.get('api/ordevice/' + id)
    return data
}

export const createOrder = async (userId, first_name, last_name, middle_name, address) => {
    const {data} = await $authHost.post('api/order',
        {
            userId: userId,
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            address: address
        })
    return data
}

export const addToOrder = async (orderId, deviceId, amount) => {
    const {data} = await $authHost.post('api/ordevice',
        {orderId: orderId, deviceId: deviceId, amount: amount})
    return data
}

export const getOrderedDevices = async(id) => {
    const {data} = await $authHost.get('api/order/' + id)
    return data
}

export const patchAddress = async (userId, address) => {
    const {data} = await $authHost.patch('api/order',
        {userId: userId, address: address})
    return data
}

export const deleteFromOrder = async (id) => {
    const {response} = await $authHost.delete('api/order/' + id)
    return response
}
//------------------------------ЗАКАЗЫ------------------------------//

//------------------------------ОТЗЫВЫ------------------------------//
export const createRate = async (rate, description, deviceId) => {
    const {response} = await $authHost.post('api/rating',
        {rate: rate, description: description, deviceId: deviceId})
    return response
}

export const getAllRates = async (id) => {
    const {response} = await $authHost.get('api/rating/' + id)
    return response
}
//------------------------------ЗАКАЗЫ------------------------------//
