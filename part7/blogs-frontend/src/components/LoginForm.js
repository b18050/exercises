import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import {
  Button,
  TextField,
} from '@material-ui/core'

const LoginForm = (props) => {
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit = {props.handleSubmit} >
        <div>
                    {/* Username <input id='username' type='text' value = {props.username} name="Username" onChange={props.handleUsernameChange} /> */}
                    <TextField label="username" />
        </div>
        <div>
                    {/* Password <input id='password' type='password' value = {props.password} name="Password" onChange={props.handlePasswordChange} /> */}
                    <TextField  label="password" type='password' />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>

    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm