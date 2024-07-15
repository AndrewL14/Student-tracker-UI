import React, { useState } from "react";
import LoginFilter from "../services/LoginFilter";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
    const navigate = useNavigate();
    const [feild1, setUsername] = useState('');
    const [feild2, setPassword] = useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('submitted:', { feild1, feild2 });
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const loginData = {feild1, feild2};

      if (emailRegex.test(loginData.feild1)){
        LoginFilter.emailLogin(loginData);
      } else {
        LoginFilter.usernameLogin(loginData);
      }
    } 

    const redirect = async event => {
        navigate('/register');
    }

    const redirectToPasswordReset = async event => {
        navigate('/password-reset');
    }

    return (
        <div className="container">
            <h1>Welcome to Graders</h1>
             <div className="login-box">
                <div className="login-form">
                    <form>
                        <h2>Login</h2>
                        <label className="login-input">
                            Username or Email:
                            <input type="text" required="required" value={feild1} onChange={handleUsernameChange} />
                        </label>
                            <br />
                        <label className="login-input">
                            Password:
                            <input type="password" required="required" value={feild2} onChange={handlePasswordChange} />
                        </label>
                            <br />
                        <button className="login-button" type="submit" onClick={handleSubmit}>Login</button>
                        <button className="register-button" type="submit" onClick={redirect}>Register</button>
                        <button className="password-reset-button" type="submit" onClick={redirectToPasswordReset}>Forgot Password?</button>
                    </form>
                </div>    
            </div>
        </div>
    )
}

export default LoginPage
