import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Button,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
  } from '@material-ui/core'

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
            <TableContainer>
                <Table>
                <TableBody >
                    
                    <TableRow>
                    <TableCell> blogs created</TableCell>
                    </TableRow>
                    <TableRow>
            {userList.map(user =>
                <tr>
                    <TableCell> <Link to={`/users/${user.id}`}>
                        {/* <User key={user.id} user={user} /> */}
                        {user.name}
                        </Link>
                    </TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                    
                
                </tr>
            )}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            </div>
            
        </div>
    )
}

export default Users

