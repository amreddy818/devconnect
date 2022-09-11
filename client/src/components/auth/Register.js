import React, { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { PropTypes } from 'prop-types';

import { register } from '../../actions/auth';

function Register({setAlert,register,isAuthenticated}) {
    const [formData, setformData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formData;
    const onChange = e => setformData({...formData,[e.target.name] : e.target.value});
    const SubmitHandler = (e) => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords did not match','danger');
        }
        else{
            register({name,email,password});
            console.log("Passwords matched Registration underprogess");
        }
    }
    if(isAuthenticated){
        return <Navigate to ='/dashboard' />
    }

    return (
        <Fragment>
            {/* <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><a href="profiles.html">Developers</a></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            </nav> */}
            <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => SubmitHandler(e)}>
                <div className="form-group">
                <input
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value = {name}
                    onChange = {e => onChange(e)}
                    required 
                />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange = {e => onChange(e)} />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value = {password}
                    onChange = {e => onChange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value = {password2}
                    onChange = {e => onChange(e)}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"  />
            </form>
            <p className="my-1">
                Already have an account? <a href="/login">Sign In</a>
            </p>
            </section>
        </Fragment>
    );
}

Register.protoType = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(null,{setAlert,register})(Register);