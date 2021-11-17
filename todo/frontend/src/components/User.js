import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}
const UserList = ({users}) => {
    return (
        <Container>
            <Row>
                <Col className='col-lg-6 col-sm-12'>
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
                        {users.map((user) => <UserItem user={user}/>)}
                        </tbody>
                    </Table>
                </Col>
            </Row>

        </Container>
    )
}

export default UserList;