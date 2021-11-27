import React from "react";
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './gb1.png'
import {BrowserRouter, Route, Link} from "react-router-dom";
import UserList from "./User";
import TodoList from "./Todo";
import ProjectList from "./Project";
import App from "../App";

const Menu = () => {
    return (
        <div className='bg-dark'>
            <Container>
                <Row>
                    <Col className='col-lg-12 col-sm-12 '>

    <Navbar>
                            <Navbar.Brand className='text-light'><img src={logo} width='30' height='30'
                                                                      className='d-inline-block '
                                                                      alt='logo'/>TODO</Navbar.Brand>

                            <Nav>

                                <Nav.Link href='#' className="text-light">Главная</Nav.Link>
                                <Nav.Link href='#' className="text-light">Пользователи</Nav.Link>



                                 </Nav>
                        </Navbar>


                    </Col>
                </Row>
            </Container>
        </div>
    )

}
export default Menu;