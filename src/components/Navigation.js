import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        
          <Navbar.Brand href="#home">Amazon</Navbar.Brand>
          <Nav className="d-flex mx-auto">
            <Link to="/" className="mr-4" style={{textDecoration:"none",color:"white", fontWeight:"bold"}}> Products</Link>
            <Link to="/course" className="mr-4" style={{textDecoration:"none",color:"white", fontWeight:"bold"}}> Courses</Link>
            <Link to="/enquiry" style={{textDecoration:"none",color:"white", fontWeight:"bold"}}>Enquiry</Link>
          </Nav>
        
      </Navbar>
    </>
  );
}
