import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._role = ''
        this._id = 0
        this._firstName = ''
        this._lastName = ''
        this._middleName = ''
        this._email = ''
        this._address = ''
        this._cars = [];
        this._selectedCar = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setRole(role) {
        this._role = role;
    }
    setId(id) {
        this._id = id
    }
    setFirstName(fName) {
        this._firstName = fName
    }
    setLastName(lName) {
        this._lastName = lName
    }
    setMiddleName(mName) {
        this._middleName = mName
    }
    setEmail(email) {
        this._email = email
    }
    setAddress(address) {
        this._address = address
    }
    setCars(cars) {
        this._cars = cars
    }
    setSelectedCar(car) {
        this._selectedCar = car
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get role() {
        return this._role
    }
    get id() {
        return this._id
    }
    get firstName() {
       return this._firstName
    }
    get lastName() {
       return this._lastName
    }
    get middleName() {
        return this._middleName
    }
    get email() {
        return this._email
    }
    get address() {
        return this._address
    }
    get cars() {
        return this._cars
    }
    get selectedCar() {
        return this._selectedCar
    }
}
