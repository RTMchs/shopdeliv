import React, {useState} from 'react';
import {Card, Row} from "react-bootstrap";

const Footer = () => {
    const [isHoverVk, setIsHoverVk] = useState(false)
    const [isHoverGit, setIsHoverGit] = useState(false)
    const [isHoverTg, setIsHoverTg] = useState(false)

    return (
        <Card
            style={{color: 'white'}}
            bg='dark' variant="dark"
            className="text-center rounded-0 mt-5 w-100"
        >
            <Card.Header>
                <h4>Exem Delivery</h4>
            </Card.Header>
            <Card.Body>
                <Card.Title>Связь со мной:</Card.Title>
                <Row className='justify-content-center mt-4'>
                    <h5 className='mx-auto py-2 rounded'
                        onMouseEnter={ () => setIsHoverVk(true)}
                        onMouseLeave={ () => setIsHoverVk(false)}
                        onClick={() => window.open('https://vk.com/id161099452', '_blank')}
                        style={{
                            cursor: "pointer",
                            border: '2px solid white',
                            borderColor: 'white',
                            background: isHoverVk ? '#00CCBB' : 'dimgray',
                            width: 100, height:50
                        }}
                    >
                        VK
                    </h5>
                    <h5 className='mx-auto py-2 rounded'
                        onMouseEnter={ () => setIsHoverGit(true)}
                        onMouseLeave={ () => setIsHoverGit(false)}
                        onClick={() => window.open('https://github.com/RTMchs', '_blank')}
                        style={{
                            cursor: "pointer",
                            border: '2px solid white',
                            borderColor: 'white',
                            background: isHoverGit ? '#00CCBB' : 'dimgray',
                            width: 100, height:50
                        }}
                    >
                        GitHub
                    </h5>
                    <h5 className='mx-auto py-2 rounded'
                        onMouseEnter={ () => setIsHoverTg(true)}
                        onMouseLeave={ () => setIsHoverTg(false)}
                        onClick={() => window.open('https://t.me/GentlePelMen', '_blank')}
                        style={{
                            cursor: "pointer",
                            border: '2px solid white',
                            borderColor: 'white',
                            background: isHoverTg ? '#00CCBB' : 'dimgray',
                            width: 100, height:50
                        }}
                    >
                        Telegram
                    </h5>
                </Row>
            </Card.Body>
            <Card.Footer style={{color: 'gray'}}>Все права не защищены</Card.Footer>
        </Card>
    );
};

export default Footer;