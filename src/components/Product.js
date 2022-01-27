import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'

export default function Product() {
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/products')
        .then(res=>{
            setData(res.data)
        })
    },[])
    return (
        <>
        <Container>
            <Row>
        {data.map(items=>
        <Col sm={6} md={4} lg={4} key={items.id}>
        <Card style={{ width: '19rem'}} className="my-4">
            <Image src={`./images/${items.images}`} height="250" width="200" className="ml-5 mt-3"/>
            <Card.Body>
                <Card.Title className="font-weight-bold">{items.pname}</Card.Title>
                <Card.Text>
                <h5 className="font-weight-bold text-danger"> Price: $ {items.price}</h5>
                <p style={{marginBottom:'-5px'}}>Quantity: {items.quantity}</p>
                <p style={{marginBottom:'-5px'}}>Get it by <span className="text-danger">{items.day}</span>  free dilavery by amazon</p>
                </Card.Text>
            </Card.Body>
        </Card>
        </Col>
        )}
        </Row>
        </Container>
        </>
    )
}
