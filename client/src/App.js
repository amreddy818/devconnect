import { React } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './components/layout/Alert';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path = "/" element = {<Landing />} />
              <Route path = "/login" element = {<Login />} />
              <Route path = "/register" element = {<Register />} />
            </Routes>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
