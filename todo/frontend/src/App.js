import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from "axios";
import UserList from "./components/User";
// import Menu from "./components/Menu";
import Footer from "./components/Footer";
import TodoList from "./components/Todo";
// import Project from "./components/Project";
import ProjectList from "./components/Project";
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import ProjectItems from "./components/ProjectItems";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todo': [],
            'projects': [],
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data
                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/').then(
            response => {
                const todo = response.data
                this.setState(
                    {'todo': todo}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/project/').then(
            response => {
                const projects = response.data
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))

    };
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className='bg-dark'>
                        <Container>
                            <Row>
                                <Col className='col-lg-12 col-sm-12 '>
                                    <Navbar>
                                        <Navbar.Brand className='text-light'><img src={logo} width='30' height='30'
                                                                                  className='d-inline-block '
                                                                                  alt='logo'/>TODO</Navbar.Brand>
                                        <Nav>

                                            <li><Link style={{marginRight: '10px'}} className="text-light"
                                                      to='/users/'>Пользователи</Link></li>
                                            <li><Link style={{marginRight: '10px'}} className="text-light mr-2"
                                                      to='/todo/'>TODO-листы</Link></li>
                                            <li><Link className="text-light" to='/projects/'>Проекты</Link></li>
                                        </Nav>
                                    </Navbar>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <Route exact path="/users/" component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path="/todo/" component={() => <TodoList todo={this.state.todo}/>}/>
                    <Route exact path="/projects/" component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path="/projects/projects/:id"
                           component={() => <ProjectItems projects={this.state.projects} users={this.state.users}
                                                          todo={this.state.todo}/>}/>
                </BrowserRouter>
                {/*<UserList users={this.state.users}/>*/}
                {/*<TodoList todo={this.state.todo}/>*/}
                {/*<ProjectList projects={this.state.projects}/>*/}
                <Footer/>
            </div>
        );
    }
}
export default App;
