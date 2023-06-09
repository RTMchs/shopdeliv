import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    const [allListener, setAllListener] = useState(false);
    const changeStatus = (isAll) => {
        if (isAll) setAllListener(true);
        if (!isAll) setAllListener(false);
    }

    return (
        <ListGroup className='overflow-auto' style={{height:210}}>
            <ListGroup.Item
                style={{cursor: 'pointer', background: allListener ? 'lightgray': ['#ffffff']}}
                className='rounded py-1'
                onClick={() => {
                    device.setSelectedType({})
                    changeStatus(true)
                }
                }
                key={999999}
            >
                Все
            </ListGroup.Item>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{
                        cursor: 'pointer',
                        background: type.id === device.selectedType.id ? 'lightgray' : ['#ffffff']
                    }}
                    className='rounded py-1'
                    onClick={() => {
                        device.setSelectedType(type)
                        changeStatus(false)
                    }
                    }
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
