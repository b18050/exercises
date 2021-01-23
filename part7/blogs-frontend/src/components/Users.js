import React from 'react'

import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const Users = (users) => {
    if(!users) return null

    const userList = users.users
    console.log(userList.users)
    return(
        <div>
            <h2>Users </h2>

            <div>
            <table>
                <th></th>
                <th>blogs created</th>
            {userList.map(user =>
                <tr>
                    <td> <Link to={`/users/${user.id}`}>
                        {/* <User key={user.id} user={user} /> */}
                        {user.name}
                        </Link></td>
                    <td >{user.blogs.length}
                    
                    </td>
                </tr>
            )}
            </table>

            </div>
            
        </div>
    )
}

export default Users

