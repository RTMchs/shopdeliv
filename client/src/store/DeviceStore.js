import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 12
        this._baskets = []
        this._brandName = ''
        this._orders = []
        this._selectedOrder = {}
        this._orderedDevices = []
        this._ratings = []
        makeAutoObservable(this)
    }

    setBrandName(name) {
        this._brandName = name
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setBaskets(basket){
        this._baskets = basket
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setOrders(orders) {
        this._orders = orders
    }
    setOrderedDevices(orderedDevices) {
        this._orderedDevices = orderedDevices
    }
    setSelectedOrder(selectedOrder) {
        this._selectedOrder = selectedOrder;
    }
    setRatings(ratings) {
        this._ratings = ratings
    }

    get brandName() {
        return this._brandName
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get basket() {
        return this._baskets
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get orders() {
        return this._orders
    }
    get orderedDevices() {
        return this._orderedDevices
    }
    get selectedOrder() {
        return this._selectedOrder
    }
    get ratings() {
        return this._ratings
    }
}
