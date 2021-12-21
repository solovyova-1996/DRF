import React from "react";
import {Container, Table, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

class SearchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', projects: ''}
    }


    dataSearch(event) {
        if (event.target.value) {
            const name_project = event.target.value.toLowerCase()
            const filter = this.props.projects.filter(project => project.nameProject.toLowerCase().indexOf(name_project) != -1)
            this.props.searchProject(name_project, filter)
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className='col-lg-6 col-sm-12'>
                        <h3 className='text-center mt-3'>Проекты</h3>
                        <div className="searchbar form-group"><input value={this.state.name} name='name' id='7'
                                                                     type="text" className="form-control"
                                                                     placeholder="Поиск проекта по названию"
                                                                     onChange={(event) => this.dataSearch(event)}/>
                        </div>
                        <Table striped bordered hover size='sm' className='mt-4 mb-5'>
                            <thead>
                            <tr>
                                <th>Name Project</th>
                                <th> Link</th>
                                <th>Users</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.projects.map((project) =>
                                <tr>
                                    <td><Link to={`projects/${project.id}`}> {project.nameProject} </Link></td>
                                    <td>{project.linkRepo}</td>
                                    <td>{project.users}</td>
                                    <td>
                                        <button onClick={() => this.props.deleteProject(project.id)}
                                                className='btn-danger' type="button">Удалить
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <div style={{marginBottom: '100px'}}><Link className="btn-success text-decoration-none p-1"
                                                                   to="/projects/create">Создать</Link></div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SearchProject

