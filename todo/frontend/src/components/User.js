import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

const UserItem = ({user,deleteUsers}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
             <td><button onClick={()=>deleteUsers(user.id)} className='btn-danger' type="button">Удалить</button></td>
        </tr>
    )
}
const UserList = ({users,deleteUsers}) => {
    return (
        <Container>
            <Row>
                <Col className='col-lg-6 col-sm-12'>
                     <h3 className='text-center mt-3'>Пользователи</h3>
                    <Table striped bordered hover size='sm' className='mt-4'>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => <UserItem user={user} deleteUsers={deleteUsers}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}
export default UserList;