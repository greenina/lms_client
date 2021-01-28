import React, { useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {Navbar, Container, Nav, Form, FormControl, Button }from 'react-bootstrap';
import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import {Logout} from '../../redux/auth/auth.actions';
import {selectUserId} from '../../redux/auth/auth.selectors'


const NavBar = () => {
    var dispatch = useDispatch();
    const history = useHistory();
    const logout = (event) => {
        event.preventDefault();
        dispatch(Logout());
        history.push('/login');
    }

    const userId = useSelector(state => {
        return selectUserId(state)
    })

    return (
        <Container>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home" id="LOGO">LMS</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/main/classes" >Class</Nav.Link>
                <Nav.Link href="/calendar">Calendar</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
                <div id="userwelcome">Hello, {userId}</div>
                
                <Button id="LOGOUT" onClick={logout}>LOGOUT</Button>
            </Navbar>
        </Container>
    )
}

export default NavBar;