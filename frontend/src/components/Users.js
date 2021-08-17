import React from 'react'

const UserItem = ({user}) => {
    return(
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return(
        <table id="table">
            <th>first name</th>
            <th>last name</th>
            <th>Email</th>
            {users.map((user)=> <UserItem user={user} />)}
        </table>
    )
}

export default UserList