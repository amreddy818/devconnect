import  React ,{useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token); 
}



function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  },[])
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
