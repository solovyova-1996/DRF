import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from "axios";
import Cookies from "universal-cookie";
import UserList from "./components/User";
import Footer from "./components/Footer";
import TodoList from "./components/Todo";
// import Project from "./components/Project";
import ProjectList from "./components/Project";
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import ProjectItems from "./components/ProjectItems";
import LoginForm from "./components/LoginForm";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todo': [],
            'projects': [],
            'token': '',
            'username': ''

        };

    }

    set_token(token, username) { // получает токен и устанавливает его в состояние
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated() { // проверяет авторизован пользователь или нет (есть что то в состоянии токена или нет)
        return !!this.state.token
    }

    logout() { // устанавливает в состояние токена пкстое значение
        this.set_token('')
    }

    get_token_from_storage() { // получает токен из cookie и уставливает его в состояние
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }

    get_token(username, password) {
        this.setState({'username': username})
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password

        }).then(response => {
            this.set_token(response.data['token'], username)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Jwt-token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response => {
                const users = response.data
                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({users: []})
        })
        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(
            response => {
                const todo = response.data
                this.setState(
                    {'todo': todo}
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({todo: []})
        })
        axios.get('http://127.0.0.1:8000/api/project/', {headers}).then(
            response => {
                const projects = response.data
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    componentDidMount() {
        this.get_token_from_storage()
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
                                            <li><Link style={{marginRight: '10px'}} className="text-light"
                                                      to='/projects/'>Проекты</Link></li>
                                            <li>{this.is_authenticated() ?
                                                <button style={{marginRight: '10px'}} className='btn-danger'
                                                        onClick={() => this.logout()}> Выйти </button> :
                                                <Link style={{marginRight: '10px'}}
                                                      className="text-light btn-success text-decoration-none p-1"
                                                      to='/login/'>Войти</Link>}</li>
                                            <li className="text-light"> Пользователь: {this.is_authenticated() ? this.state.username : 'неавторизован'} </li>
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
                    <Route exact path="/login/" component={() => <LoginForm
                        get_token={(username, password) => this.get_token(username, password)}
                    />}/>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}

export default App;
