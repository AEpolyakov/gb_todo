import React from 'react'

const UserItem = ({user}) => {
    return(
        <tr>
            <td>{user.id}</td>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{user.password.substring(0, 16)}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return(
        <table id="table">
            <th>id</th>
            <th>user name</th>
            <th>Pass</th>
            {users.map((user)=> <UserItem user={user} />)}
        </table>
    )
}

export default UserList