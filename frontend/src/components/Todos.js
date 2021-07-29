import React from 'react'

const TodoItem = ({todo}) => {
    return(
        <tr>
            <td>{todo.text}</td>
            <td>{todo.project.name}</td>
            <td>{todo.created_by}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return(
        <table id="table">
            <th>Todo text</th>
            <th>Project name</th>
            <th>created by</th>
            {todos.map((todo)=> <TodoItem todo={todo} />)}
        </table>
    )
}

export {TodoList}