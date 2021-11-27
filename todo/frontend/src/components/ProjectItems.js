import React from "react";
import {Container,  Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams} from "react-router-dom";

const ProjectItem = ({project, users, todo}) => {
    const todolist = []
    todo.forEach((todoitem) => {
        if (todoitem.project == project.id) {
            todolist.push(todoitem.textTodo)
        }
    })
    return (

        <ol>
            <li><b>Name Project:</b> {project.nameProject}</li>
            <li><b>Link Project:</b> {project.linkRepo}</li>
            <li><b>Users:</b> {project.users.map((userId) => {
                return users.find((user) => user.id == userId).username + ', '
            })}</li>
            <li><b>Todo:</b> {todolist.map((todo) => todo + ', ')}</li>


        </ol>


    )
}
const ProjectItems = ({projects, users, todo}) => {
    let {id} = useParams();
    let filtered_project = projects.filter((project) => project.id == id)


    return (
        <Container>
            <Row>
                <Col className='col-lg-6 col-sm-12
                mt-3'>
                    <p> {filtered_project.map((project) => <ProjectItem project={project} users={users}
                                                                        todo={todo}/>)}</p>

                </Col>
            </Row>

        </Container>
    )
}

export default ProjectItems;