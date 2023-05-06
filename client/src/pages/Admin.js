import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";
import DeleteDevice from "../components/modals/DeleteDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [delBrandVisible, setDelBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [delTypeVisible, setDelTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [delDeviceVisible, setDelDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-danger"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>

            <Button
                variant={"outline-danger"}
                className="mt-4 p-2"
                onClick={() => setDelTypeVisible(true)}
            >
                Удалить тип
            </Button>

            <Button
                variant={"outline-primary"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>

            <Button
                variant={"outline-primary"}
                className="mt-4 p-2"
                onClick={() => setDelBrandVisible(true)}
            >
                Удалить бренд
            </Button>

            <Button
                variant={"outline-success"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить товар
            </Button>

            <Button
                variant={"outline-success"}
                className="mt-4 p-2"
                onClick={() => setDelDeviceVisible(true)}
            >
                Удалить товар
            </Button>

            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <DeleteBrand show={delBrandVisible} onHide={ () => setDelBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteType show={delTypeVisible} onHide={() => setDelTypeVisible(false)}/>
            <DeleteDevice show={delDeviceVisible} onHide={() => setDelDeviceVisible(false)}/>

        </Container>
    );
};

export default Admin;
