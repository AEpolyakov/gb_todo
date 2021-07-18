import React from 'react'

const AuthorItem = ({user}) => {
    return(
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.password.substring(0, 16)}</td>
        </tr>
    )
}

const AuthorList = ({users}) => {
    console.log('from list: users = ',users)
    return(
        <table id="users">
            <th>first name</th>
            <th>last name</th>
            <th>Pass</th>
            {users.map((user)=> <AuthorItem user={user} />)}
        </table>
    )
}

export default AuthorList