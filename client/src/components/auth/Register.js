import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
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
            console.log("Passwords didn't match");
        }
        else{
            console.log("Passwords matched Registration underprogess");
        }
    }
    return (
        <Fragment>
            <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><a href="profiles.html">Developers</a></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
            </nav>
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

export default Register;