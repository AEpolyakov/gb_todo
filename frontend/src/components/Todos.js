import React from 'react'
import { useParams, Link } from 'react-router-dom'

const TodoItem = ({todo, project, user, deleteTodo}) => {
    return(
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{project.name}</td>
            <td>{user.first_name + ' ' + user.last_name}</td>
            <td><button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos, projects, users, deleteTodo}) => {
    return(
        <div>
            <table id="table">
                <th>id</th>
                <th>Todo text</th>
                <th>Project name</th>
                <th>created by</th>
                <th></th>
                {todos.map((todo) =>
                    <TodoItem
                        todo = {todo}
                        project = {projects.find((project) => project.id === todo.project)}
                        user = {users.find((user) => user.id === todo.created_by)}
                        deleteTodo = {deleteTodo}
                    />)
                }
            </table>
        </div>
    )
}

export {TodoList}