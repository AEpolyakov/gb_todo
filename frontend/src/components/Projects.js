import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td><Link to={`${project.id}`}>{project.name}</Link></td>
            <td>{project.users.map((user) => user.first_name)}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return(
        <table id="table">
            <th>Project name</th>
            <th>Users in project</th>
            {projects.map((project)=> <ProjectItem project={project} />)}
        </table>
    )
}

const ProjectSingle = ({projects}) => {
    let {id} = useParams()
    let filtered_projects = projects.filter((project) => project.id == parseInt(id))
    let project = filtered_projects[0]
    return(
        <div>
            <Link to='/projects/'>Back</Link>
            <div class='project'>
                <h4>Project:  {project.name}</h4>
                <p>participants:</p>
                <ul>
                    {project.users.map((user) => <li>{user.first_name}  {user.last_name}</li>)}
                </ul>
            </div>
        </div>
    )
 }

export {ProjectList, ProjectSingle}