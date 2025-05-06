import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

const RestSignUp = () => {
    const [restName, setRestName] = useState('');
    const [restAddress, setRestAddress] = useState('');
    const [restHours, setRestHours] = useState('');
    const [restOptions, setRestOptions] = useState([]);
    const [customOption, setCustomOption] = useState('');
    const [restImage, setRestImage] = useState('');
    const [restDescription, setRestDescription] = useState('');

    const defaultOptions = ['Beer', 'Wine', 'Cocktails', 'Appetizers'];

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setRestOptions((prev) => [...prev, value]);
        } else {
            setRestOptions((prev) => prev.filter((option) => option !== value));
        }
    };

    const handleAddCustomOption = () => {
        const trimmed = customOption.trim();
        if (trimmed && !restOptions.includes(trimmed)) {
            setRestOptions((prev) => [...prev, trimmed]);
            setCustomOption('');
        }
    };

    const handleRestSignUp = (event) => {
        event.preventDefault();

        axios.post('http://localhost:9000/createRestaurant', { 
            name: restName,
            address: restAddress,
            hours: restHours,
            options: restOptions,
            image: restImage,
            description: restDescription
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
                <label>Restaurant Options:</label>
                {defaultOptions.map((option) => (
                    <div key={option}>
                        <input
                            type="checkbox"
                            value={option}
                            checked={restOptions.includes(option)}
                            onChange={handleOptionChange}
                        />
                        {option}
                    </div>
                ))}
                <div>
                    <input
                        type="text"
                        placeholder="Add custom option"
                        value={customOption}
                        onChange={(e) => setCustomOption(e.target.value)}
                    />
                    <button type="button" onClick={handleAddCustomOption}>
                        Add Option
                    </button>
                </div>
                {restOptions.length > 0 && (
                    <div>
                        <strong>Selected Options:</strong> {restOptions.join(', ')}
                    </div>
                )}
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

            <div>
                <label> Restaurant Description: </label>
                <textarea
                value = {restDescription}
                onChange = {(e) => setRestDescription(e.target.value)}
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