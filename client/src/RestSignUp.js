import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

const RestSignUp = () => {
    const [restName, setRestName] = useState('');
    const [restAddress, setRestAddress] = useState('');
    const [restHours, setRestHours] = useState('');
    const [restOptions, setRestOptions] = useState([]);
    const [restImage, setRestImage] = useState('');

    const handleRestSignUp = (event) => {
        event.preventDefault();

        const optionsArray = restOptions.split(',').map(option => option.trim());

        axios.post('http://localhost:9000/createRestaurant', { 
            name: restName,
            address: restAddress,
            hours: restHours,
            options: optionsArray,
            image: restImage
        })
        .catch((err) => alert('Error in Signing Up'))

    }
    return(
        <form onSubmit={handleRestSignUp}>
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
            <div>
                <label> Restaurant Image URL: </label>
                <input
                type= "text"
                value = {restImage}
                onChange = {(e) => setRestImage(e.target.value)}
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