import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    const [formData, setformData] = useState({
        email: '',
        password: '',
    });
    const {email, password } = formData;
    const onChange = e => setformData({...formData,[e.target.name] : e.target.value});
    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
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
            <h1 className="large text-primary">Log in</h1>
            <p className="lead"><i className="fas fa-user"></i> Login into your Account</p>
            <form className="form" onSubmit={e => SubmitHandler(e)}>
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
                <input type="submit" className="btn btn-primary" value="Login"  />
            </form>
            <p className="my-1">
                Do not have an accout? <Link to="/register">Register</Link>
            </p>
            </section>
        </Fragment>
    );
}

export default Login;