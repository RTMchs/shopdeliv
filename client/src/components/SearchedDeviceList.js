import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const SearchedDeviceList = observer(() => {
    const {device} = useContext(Context)
    if (device.searchedDevices.length > 0) {
        return (
            <Row className="d-flex">
                {device.searchedDevices.map(device =>
                    <DeviceItem key={device.id} device={device}/>
                )}
            </Row>
        );
    } else {
        return (
        <h3 style={{color: '#80526c'}} className='w-100 text-center my-5 py-5'>Товары не найдены</h3>
        )
    }
});

export default SearchedDeviceList;
