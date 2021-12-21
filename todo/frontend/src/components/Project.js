import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";


const ProjectItem = ({project,deleteProject}) => {
    return (
        <tr>
            <td><Link to={`projects/${project.id}`}> {project.nameProject} </Link></td>
            <td >{project.linkRepo}</td>
            <td>{project.users}</td>
            <td><button onClick={()=>deleteProject(project.id)} className='btn-danger' type="button">Удалить</button></td>
        </tr>
    )
}

const ProjectList = ({projects,deleteProject}) => {
    return (
        <Container>
            <Row>
                <Col className='col-lg-6 col-sm-12'>
                    <h3 className='text-center mt-3'>Проекты</h3>
                    <div className="searchbar form-group"><input
                                                             type="text" className="form-control"
                                                             placeholder="Поиск проекта по названию"
                                                            /></div>
                    <Table striped bordered hover size='sm' className='mt-4 mb-5'>
                        <thead>
                        <tr>
                            <th>Name Project</th>
                            <th> Link</th>
                            <th>Users</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
                        </tbody>
                    </Table>
                    <div style={{marginBottom: '100px'}}><Link className="btn-success text-decoration-none p-1" to="/projects/create">Создать</Link></div>
                </Col>
            </Row>
        </Container>
    )
}
export default ProjectList;