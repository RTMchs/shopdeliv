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
        this._avOrders = []
        this._curOrders = []
        this._lat = 0
        this._lon = 0
        this._selectedOrder = {}
        this._orderedDevices = []
        this._ratings = []
        this._searchedDevices = []
        makeAutoObservable(this)
    }

    setSearchedDevices (searchedDevices) {
        this._searchedDevices = searchedDevices
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
    setAvOrders(avOrders) {
        this._avOrders = avOrders
    }
    setCurOrders(curOrders) {
        this._curOrders = curOrders
    }
    setLat(lat) {
        this._lat = lat
    }
    setLon(lon) {
        this._lon = lon
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

    get searchedDevices() {
        return this._searchedDevices
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
    get avOrders() {
        return this._avOrders
    }
    get curOrders() {
        return this._curOrders
    }
    get lat() {
        return this._lat
    }
    get lon() {
        return this._lon
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
