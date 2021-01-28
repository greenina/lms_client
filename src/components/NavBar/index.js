import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav, Form, FormControl, Button }from 'react-bootstrap';
import './NavBar.css';
const NavBar = () => {
    return (
        <Container>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home" id="LOGO">LMS</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home" >Class</Nav.Link>
                <Nav.Link href="#features">  Calendar  </Nav.Link>
                <Nav.Link href="#contact">  Contact  </Nav.Link>
                </Nav>
                <Button id="LOGOUT">LOGOUT</Button>
            </Navbar>
        </Container>

    )
}

export default NavBar;