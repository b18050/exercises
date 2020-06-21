import React from 'react'

const LoginForm = (props) => {
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit = {props.handleLogin} >
                <div>
                    Username <input type='text' value = {props.username} name="Username" onChange={props.handleChange} />
                </div>
                <div>
                    Password <input type='password' value = {props.password} name="Password" onChange={props.handleChange} />
                </div>
                <button type="submit">login</button>
            </form>

        </div>
    )
}

export default LoginForm