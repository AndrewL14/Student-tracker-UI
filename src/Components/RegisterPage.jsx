import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subject, setSubject] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    }

    const handleSubjectChange = event => {
        setSubject(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log('submitted:', { username, email, password, subject });
        if (!emailRegex.test(email)){
            alert('Invalid email address')
            return;
        }
        const reqBody = {username, email, password, subject};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        };

        try {
            const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/auth/register', requestOptions);

            if (response.ok) {
                const data = await response.json();

                if (data.jwt) {
                    localStorage.setItem('jwt', data.jwt);
                    localStorage.setItem('teacher_name', data.teacherUsername);
                    navigate('/dashboard');
                  } else {
                    throw new Error('JWT not present in the response');
                  }
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Registration failed. Please try again.');
        }
    }

    

        return (
            <div className="container">
                <h1>Welcome future Graders</h1>
                 <div className="login-box">
                    <div className="login-form">
                        <form>
                            <h2>Register</h2>
                            <label className="login-input">
                                Username:
                                <input type="text" required="required" value={username} onChange={handleUsernameChange} />
                            </label>
                                <br />
                                <label className="login-input">
                                Email:
                                <input type="text" required="required" value={email} onChange={handleEmailChange} />
                            </label>
                                <br />
                            <label className="login-input">
                                Password:
                                <input type="password" required="required" value={password} onChange={handlePasswordChange} />
                            </label>
                                <br />
                            <label className="login-input">
                                Subject:
                                <input type="text" required="required" value={subject} onChange={handleSubjectChange} />
                            </label>
                                <br />
                            <button className="register-button" type="submit" onClick={handleSubmit}>Register</button>
                        </form>
                    </div>    
                </div>
            </div>
        )
}

export default RegisterPage