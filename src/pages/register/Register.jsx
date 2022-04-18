import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useContext, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import './Register.css'

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const [errorMsg, setErrorMsg] = useState(null);

    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
        setErrorMsg(null);
        event.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            // passwordAgain.current.setCustomValidity("Passwords don't match!");
            setErrorMsg("Passwords don't match!");
            return;
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };

            try {
                await axios.post('/auth/register', user);
                history.push('/login');
            } catch (err) {
                console.log(err);
            }

        }

    }
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">PVTMedia</h3>
                    <span className="registerDesc">Connect with friends and the world around you</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input className="registerInput" type="text" placeholder="Username" required ref={username} />
                        <input className="registerInput" type="email" placeholder="Email" required ref={email} />
                        <input className="registerInput" type="text" placeholder="Password" required ref={password} minLength='6' />
                        <input className="registerInput" type="text" placeholder="Password Again" required ref={passwordAgain} minLength='6' />
                        <button className="registerButton" type='submit' disabled={isFetching}>{isFetching ? <CircularProgress style={{ color: 'white', size: "20px" }} /> : 'SignUp'}</button>
                        <button className="registerRegister">
                            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                Log into your Account !
                            </Link>
                        </button>
                        <span className="registerError">{errorMsg && errorMsg}</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register