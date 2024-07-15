import React, { useState } from "react";
import LoginFilter from "../services/LoginFilter";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('teacher'); // default role is teacher


const handleEmailChange = event => {
    setEmail(event.target.value);
};

const handlePasswordChange = event => {
    setPassword(event.target.value);
};

const handleRoleChange = event => {
    setRole(event.target.value);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submitted:', { email, password, role });
    const loginData = { email, password };

    if (role === 'teacher') {
        LoginFilter.teacherLogin(loginData);
    } else if (role === 'student') {
        LoginFilter.studentLogin(loginData);
    } else {
        LoginFilter.basicLogin(loginData);
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
                        Email:
                        <input type="email" required="required" value={email} onChange={handleEmailChange} />
                    </label>
                        <br />
                    <label className="login-input">
                        Password:
                        <input type="password" required="required" value={password} onChange={handlePasswordChange} />
                    </label>
                        <br />
                    <label className="login-input">
                        Role:
                        <select value={role} onChange={handleRoleChange}>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
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