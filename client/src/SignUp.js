import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userOptions, setuserOptions] = useState([]);
    const [numOptions, setnumOptions] = useState('');

    const defaultOptions = ['Beer', 'Wine', 'Cocktails', 'Appetizers'];

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setuserOptions((prev) => [...prev, value]);
        } else {
            setuserOptions((prev) => prev.filter((option) => option !== value));
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        axios.post('http://localhost:9000/createUser', { firstName, lastName, username, password, options: userOptions, numOptions })
            .catch((err) => alert('Error in Signing Up'))
    }

    return(
        <form onSubmit={handleSignUp}>
            <div>
                <label> First Name: </label>
                <input
                type = "text"
                value = {firstName}
                onChange = {(e) => setFirstName(e.target.value)}
                required
            />
            </div>
            <div>
                <label> Last Name: </label>
                <input
                type= "text"
                value = {lastName}
                onChange = {(e) => setLastName(e.target.value)}
                required
            />

            </div>
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
            </div>

            <div>
                <label>Food/Drink Options:</label>
                {defaultOptions.map((option) => (
                    <div key={option}>
                        <input
                            type="checkbox"
                            value={option}
                            checked={userOptions.includes(option)}
                            onChange={handleOptionChange}
                        />
                        {option}
                    </div>
                ))}
                {userOptions.length > 0 && (
                    <div>
                        <strong>Selected Options:</strong> {userOptions.join(', ')}
                    </div>
                )}
            </div>
            <div>
                <label> Number of options for a match: </label>
                <input
                type = "text"
                value = {numOptions}
                onChange = {(e) => setnumOptions(e.target.value)}
                required
            />
            </div>

            <button type = "submit"> Submit </button>
            <div>
                <Link to = "/Login">Have an account? Login</Link>
            </div>
        </form>
    );
};

export default SignUp;