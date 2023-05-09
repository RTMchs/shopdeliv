import React, {useEffect, useState} from 'react';
import {Card, Spinner} from "react-bootstrap";
import {fetchPersonal} from "../http/userAPI";
import {StarIcon} from "@heroicons/react/24/solid";

const Rate = ({rating}) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        fetchPersonal(rating.userId).then(data => setUser(data))
    }, [rating])

    if (rating) {
        return (
            <Card className='my-2 w-100'>
                <div className='ml-2 w-100 mt-2 px-2'>
                    <div>
                        <h6 className='m-0 text-break'>Покупатель:</h6>
                        <h6
                            style={{color: ['#80526c']}}
                            className='my-0 text-break'
                        >
                            {user.last_name} {user.first_name} {user.middle_name}
                        </h6>
                    </div>
                    <div className='d-flex mt-2'>
                        <h6>Оценка:</h6>
                        <h6 style={{color: ['#80526c']}} className='ml-2'>
                            {rating.rate}<StarIcon width={24} height={24} className='pb-1'/>
                        </h6>
                    </div>
                    <div className='w-100 pr-1'>
                        <h6>Комментарий:</h6>
                        <h6 style={{color: ['#80526c']}}>{rating.description}</h6>
                    </div>
                </div>

            </Card>
        );
    } else {
        return <Spinner animation={"grow"}/>
    }
}

export default Rate;