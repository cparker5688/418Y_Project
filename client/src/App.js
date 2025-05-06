import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Login       from './Login';
import SignUp      from './SignUp';
import RestSignUp  from './RestSignUp';
import Preferences from './Preferences';
import Homepage    from './Homepage';
import Favorites   from './Favorites';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"            element={<Login />}      />
        <Route path="/login"       element={<Login />}      />
        <Route path="/signup"      element={<SignUp />}     />
        <Route path="/restsignup"  element={<RestSignUp />} />
        <Route path="/preferences" element={<Preferences/>} />
        <Route path="/homepage"    element={<Homepage />}   />
        <Route path="/favorites"   element={<Favorites />}  />
        <Route path="*"            element={<Navigate to="/" replace/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
