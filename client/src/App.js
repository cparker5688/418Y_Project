import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import RestSignUp from './RestSignUp';
import Preferences from './Preferences';

function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Login/>} />
            <Route path = "Login" element = {<Login/>}/>
            <Route path = "SignUp" element = {<SignUp/>}/>
            <Route path = "RestSignUp" element = {<RestSignUp/>}/>
            <Route path="/preferences" element={<Preferences />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;
