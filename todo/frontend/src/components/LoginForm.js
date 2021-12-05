import React from 'react'
import {Col, Container, Form, Row,} from "react-bootstrap"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''}  // состояние, в котором будут храниться логин и пароль пользователя
    }

    handleChange(event) { //сработает во время ыыода данных в поля login и password
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) { // сработает во время нажатия на submit
        console.log(this.state.login, this.state.password)
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className='justify-content-center mt-4'>
                        <Col className='col-lg-6 col-sm-6'>
                            <Form className='bg-secondary bg-opacity-25  p-3'
                                  onSubmit={(event) => this.handleSubmit(event)}>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Войдите в систему:</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Введите логин</Form.Label>
                                    <input className='mt-2' style={{marginLeft: '10px'}} type="text" name='login'
                                           placeholder='login'
                                           value={this.state.login}
                                           onChange={(event) => this.handleChange(event)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <Form.Label>Введите пароль</Form.Label>
                                    <input style={{marginLeft: '6px'}} type='password' name='password'
                                           placeholder='password'
                                           value={this.state.password}
                                           onChange={(event) => this.handleChange(event)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <input className='btn-success' type='submit' value='Войти'/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>);
    }
}

export default LoginForm