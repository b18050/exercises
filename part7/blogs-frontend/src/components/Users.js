import React from 'react'
import User from './../components/User'

const Users = (users) => {
    if(!users) return null

    const userList = users.users
    console.log(userList.users)
    return(
        <div>
            <h2>User </h2>
            {userList.map(user =>
                <User
                    key={user.id}
                    user={user}
                />
            )}
        </div>
    )
}

export default Users

