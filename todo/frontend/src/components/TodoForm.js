import React from "react";
import {Col, Container, Form, Row} from "react-bootstrap";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: '',user: '', text_todo:"",}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project,this.state.user,this.state.text_todo)
        event.preventDefault()
    }

    render() {
        return (
             <div>
                <Container>
                    <Row className='justify-content-center mt-4'>
                        <Col className='col-lg-6 col-sm-6'>
                            <Form className='bg-success bg-opacity-25  p-3'
                                  onSubmit={(event) => this.handleSubmit(event)}>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Создать TODO</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3 text-center">
                                    <Form.Label className=''>Текс TODO</Form.Label>
                                    <input className='mt-2' style={{marginLeft: '10px'}} type="text" name="text_todo" value={this.state.text_todo}
                           onChange={(event) => this.handleChange(event)}/>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <Form.Label>Выбрать пользователя</Form.Label>
                                    <select className="form-control" name="user"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) =>
                            <option value={item.id}>
                                {item.username}
                            </option>)}
                    </select>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                     <Form.Label>Выбрать проект</Form.Label>
                                   <select className="form-control" name="project"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) =>
                            <option value={item.id}>
                                {item.nameProject}
                            </option>)}
                    </select>
                                </Form.Group>
                                <Form.Group className="mb-3 text-center">
                                    <input className="btn-success" type="submit" value="Сохранить"/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default TodoForm