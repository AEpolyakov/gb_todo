import React from 'react'
import { useParams, Link } from 'react-router-dom'

const ProjectItem = ({project, users, deleteProject}) => {
    return(
        <tr>
            <td><Link to={`${project.id}`}>{project.name}</Link></td>
            <td>{users.map((user)=> <a>{user.first_name} {user.last_name}; </a>)}</td>
            <td><button onClick={() => deleteProject(project.id)} type="button">del prj</button></td>
        </tr>
    )
}

const ProjectList = ({projects, users, deleteProject}) => {
    return(
        <table id="table">
            <th>Project name</th>
            <th>Users in project</th>
            <th></th>
            <tbody>
            {projects.map((project) =>
                <ProjectItem
                    project = {project}
                    users = {find_users_of_project(project, users)}
                    deleteProject = {deleteProject}
                />)
            }
            </tbody>
        </table>
    )
}

function find_users_of_project(project, users){
    let result_users = []
    project.users.map( (project_user_id) => {
        const project_user = users.find((user) => user.id === project_user_id)
        result_users.push({"first_name": project_user.first_name, "last_name": project_user.last_name})
    } )
    return result_users
}

const ProjectSingle = ({todos, projects, users}) => {
    console.log('from prj single:', todos, projects, users)
    let {id} = useParams()
    let project = projects.filter((project) => project.id === parseInt(id))[0]
    let current_project_todos = todos.filter((todo) => todo.project === project.id)

    return(
        <div>
            <Link to='/projects/'>Back</Link>
            <div class='project'>
                <h4>Project:  {project.name}</h4>
                <p>participants:</p>
                <ul>
                    {find_users_of_project(project, users).map((user) => <li key={user.id}>{user.first_name} {user.last_name}</li>)}
                </ul>
                <hr />
                <p>todo list:</p>
                <ul>
                    {current_project_todos.map((todo) => <li key={todo.text.substring(0, 5)}>{todo.text}</li>)}
                </ul>
            </div>
        </div>
    )
 }

export {ProjectList, ProjectSingle}