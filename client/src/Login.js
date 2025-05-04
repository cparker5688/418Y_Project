import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        axios.get('http://localhost:9000/getUser', { params: {username, password}})
            .then((res) => {
                if (res.data) {
                    alert('Login Successful')
                    navigate('/RestSignUp')
                }
                else {
                    alert('Wrong Credentials')
                }
            })
            .catch((err) => alert('Error in Login'))
    }

    return(
        <form onSubmit={handleLogin}>
            <div>
                <label> Username: </label>
                <input 
                type = "text"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>
            <div>
                <label> Password: </label>
                <input
                type = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                required
            />
        <button type="button" onClick={(event) => {
                handleLogin(event, username, password)
                }}>Login</button>
        <div></div>
        <Link to = "/signup">Don't have an account? Sign up</Link>
        </div>
        <div>
            <Link to = "/restsignup">Restaurant Entry</Link>
        </div>
        </form>
    );
};

export default Login;