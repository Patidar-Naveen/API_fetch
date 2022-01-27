    import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'

export default function Enquiry() {
    const [state, setstate] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/enquiries')
        .then(res=>{
            setstate(res.data)
        })
    },[])

    return (
        <div>
          <h2 className="text-center mt-3">List of Enquiry</h2>
            <Container>
          <Table striped bordered hover className="mt-4 text-center">
            <thead>
                <tr>               
                <th>Query No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>For Course</th>
                </tr>
            </thead>
            
            <tbody>
                {state.length === 0 ? 
                <tr><td colSpan='5'>No query Available</td></tr>

                :
            state.map((ele, index)=>
                <tr>
                <td>{index+1}</td>
                <td>{ele.eName}</td>
                <td>{ele.email}</td>
                <td>{ele.contact}</td>
                <td>{ele.coursename}</td>
                </tr>
                )}
            </tbody>
            
            </Table>
            </Container>
        </div>
    )
}
