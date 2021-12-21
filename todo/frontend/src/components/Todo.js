import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

const TodoItem = ({todoitem,deleteTodo}) => {
    return (
        <tr>
            <td>{todoitem.textTodo}</td>
            <td>{todoitem.createdAt}</td>
            <td>{todoitem.updatedAt}</td>
            <td>{todoitem.isActive}</td>
            <td>{todoitem.project}</td>
            <td>{todoitem.user}</td>
            <td><button onClick={()=>deleteTodo(todoitem.id)} className='btn-danger' type="button">Удалить</button></td>
        </tr>
    )
}
const TodoList = ({todo,deleteTodo}) => {
    return (
        <Container>
            <Row>
                <Col className='col-lg-6 col-sm-12'>
                     <h3 className='text-center mt-3'>TODO-листы</h3>
                    <Table striped bordered hover size='sm' className='mt-4 mb-4'>
                        <thead>
                        <tr>
                            <th>Text</th>
                            <th>Create Date</th>
                            <th>Update Date</th>
                            <th>Active</th>
                            <th>Project</th>
                            <th>User</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {todo.map((todoitem) => <TodoItem todoitem={todoitem} deleteTodo={deleteTodo}/>)}
                        </tbody>
                    </Table>
                    <div style={{marginBottom: '100px'}}><Link className="btn-success text-decoration-none p-1" to="/todo/create">Создать</Link></div>

                </Col>
            </Row>
        </Container>
    )
}
export default TodoList;