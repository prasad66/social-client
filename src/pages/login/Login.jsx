import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

import './Login.css'

const Login = () => {

    const { isFetching, dispatch } = useContext(AuthContext);
    const email = useRef();
    const password = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">PVTMedia</h3>
                    <span className="loginDesc">Connect with friends and the world around you</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input className="loginInput" type="email" placeholder="Email" ref={email} required />
                        <input className="loginInput" type="password" placeholder="Password" ref={password} minLength='6' required />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress style={{ color: 'white', size: "20px" }} /> : 'Login'}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegister">Create a new account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login