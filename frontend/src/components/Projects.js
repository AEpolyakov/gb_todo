import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td><Link to={`${project.id}`}>{project.name}</Link></td>
            <td>{project.users.map((user) => `${user.first_name} ${user.last_name}; `)}</td>
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

const ProjectSingle = ({todos, projects, users}) => {
    let {id} = useParams()
    let filtered_projects = projects.filter((project) => project.id == parseInt(id))
    let project = filtered_projects[0]
    let current_project_todos = todos.filter((todo) => todo.project == project.id)
    return(
        <div>
            <Link to='/projects/'>Back</Link>
            <div class='project'>
                <h4>Project:  {project.name}</h4>
                <p>participants:</p>
                <ul>
                    {project.users.map((user) => <li>{user.first_name}  {user.last_name}</li>)}
                </ul>
                <hr />
                <p>todo list:</p>
                <ul>
                    {current_project_todos.map((todo) => <li>{todo.text}</li>)}
                </ul>
            </div>
        </div>
    )
 }

export {ProjectList, ProjectSingle}