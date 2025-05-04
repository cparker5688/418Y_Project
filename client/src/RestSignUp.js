import React, {useState} from "react";
import {Link} from "react-router-dom";

const RestSignUp = () => {
    const [restName, setRestName] = useState('');
    const [restAddress, setRestAddress] = useState('');
    const [restHours, setRestHours] = useState('');
    const [restOptions, setRestOptions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Restaurant Name:", restName);
        console.log("Restaurant Address:", restAddress);
        console.log("Restaurant Hours:", restHours);
        console.log("Restaurant Options:", restOptions);

    }
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Restaurant Name: </label>
                <input
                type = "text"
                value = {restName}
                onChange = {(e) => setRestName(e.target.value)}
                required
            />
            </div>
            <div>
                <label> Restaurant Address: </label>
                <input
                type= "text"
                value = {restAddress}
                onChange = {(e) => setRestAddress(e.target.value)}
                required
            />
            </div>
            <div>
                <label> Restaurant Hours: </label>
                <input
                type= "text"
                value = {restHours}
                onChange = {(e) => setRestHours(e.target.value)}
                required
            />
            </div>
            <div>
                <label> Restaurant Options: </label>
                <input
                type= "text"
                value = {restOptions}
                onChange = {(e) => setRestOptions(e.target.value)}
                required
            />
            </div>

            <button type = "submit"> Submit </button>
            <div>
            <Link to = "/Login">Login</Link>
            </div>
            </form>
        );
    };
export default RestSignUp;