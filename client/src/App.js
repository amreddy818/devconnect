import { React } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          <Route exact path = "/" element = {<Landing />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/register" element = {<Register />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
