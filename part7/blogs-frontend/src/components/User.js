import React from 'react'
const User = (user) => {
    console.log(user)
    return(
        <div>
        <div>
        <i>{user.user.name} wrote {user.user.blogs.length} blogs.</i>
      </div>

        </div>
    )
}

export default User

