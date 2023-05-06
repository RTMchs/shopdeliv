import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    const [allListener, setAllListener] = useState(false);
    const changeStatus = (isAll) => {
        if (isAll) setAllListener(true);
        if (!isAll) setAllListener(false);
    }

    return (
        <Row className="d-flex">
            <Card
                style={{cursor: 'pointer', borderColor: allListener ? ['#00CCBB'] : ['#c9c9c9']}}
                key={999998}
                className="py-1 px-1 m-1 text-center"
                onClick={() => {
                    device.setSelectedBrand({});
                    changeStatus(true);
                }}
            >
                Все
            </Card>
            {device.brands.map(brand =>
                <Card
                    style={{
                        cursor: 'pointer',
                        borderColor: brand.id === device.selectedBrand.id ? ['#00CCBB'] : ['#c9c9c9']
                    }}
                    key={brand.id}
                    className="py-1 px-2 m-1 flex-grow-1 text-center"
                    onClick={() => {
                        device.setSelectedBrand(brand);
                        changeStatus(false);
                    }
                    }
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
