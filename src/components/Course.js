import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Container, Image, Row, Button, Form, Alert, Modal } from 'react-bootstrap'
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForContact = RegExp(/^[6-9][0-9]{9}/)
export default function Course() {
    const [subject, setSubject] = useState([])
    const [show, setShow] = useState(false);
    const [errors, seterror] = useState(' ');
    const [name, setname] = useState(' ');
    const fname = useRef(null)
    const email = useRef(null)
    const contact = useRef(null)

    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "fname":
                let error = regForName.test(value) ? "" : "Name should be character";
                seterror(error);
                break;
            case "email":
                let error2 = regForEmail.test(value) ? "" : "Enter Correct Email-Id";
                seterror(error2);
                break;
            case "contact":
                let error3 = regForContact.test(value) ? "" : "Enter 10 Digit Contact Number";
                seterror(error3);
                break;
        }
    }

    const validate = () => {

        console.log(errors)
        if (errors.length == 0) {
            let formData = {
                eName: fname.current.value,
                email: email.current.value,
                contact: contact.current.value,
                coursename: name
            };
            console.log(formData)

            axios.post(`http://localhost:3001/enquiries`, formData)
            fname.current.value = ''
            email.current.value = ''
            contact.current.value = ''
            setShow(false)
        }
        else {
            seterror("Enter all details")
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3001/courses')
            .then(res => {
                setSubject(res.data)
            })
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const query = (name)=> {
        setname(name)
        handleShow()
        
    }
    return (
        <>
            <Container>
                <h1 className="text-center my-4 font-weight-bold">Free Courses</h1>
                <Row>
                    {subject.map(items =>
                        <Col sm={6} md={4} lg={4} key={items.id}>
                            <Card style={{ width: '18rem' }} className="mb-4 text-center">
                                <Image src={`./images/${items.img}`} height="250" width="200" className="ml-5 mt-3" />
                                <Card.Body>
                                    <Card.Title className="font-weight-bold">{items.cname}</Card.Title>
                                    <Card.Text>
                                        <p> Usage: {items.desc}</p>
                                    </Card.Text>
                                    <Button variant="primary" onClick={()=>query(items.cname)}>Enquiry</Button>
                                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Enquiry</button> */}

                                </Card.Body>
                            </Card>
                        </Col>
                    )}

                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                    {errors.length > 1 && <Alert severity="danger">{errors}</Alert>}
                <Modal.Header closeButton>
                    <Modal.Title>We will Get You Back</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="fname" ref={fname} onBlur={handler} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" ref={email} onBlur={handler} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Contact Number" name="contact" ref={contact} onBlur={handler} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={() => validate()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
