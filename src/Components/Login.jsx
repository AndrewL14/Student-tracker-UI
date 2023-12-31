import React, { useState } from "react";

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submitted:', { username, password });
      
        const reqBody = { username, password };
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody),
        };
      
        try {
          const response = await fetch('http://localhost:8000/auth/login', requestOptions);
      
          if (response.ok) {
            const data = await response.json();
      
            if (data.jwt) {
              localStorage.setItem('jwt', data.jwt);
              localStorage.setItem('teacher_name', data.teacherUsername);
              window.location.href = 'http://localhost:3000/dashboard';
            } else {
              throw new Error('JWT not present in the response');
            }
          } else {
            throw new Error('Invalid username or password');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed. Please check your credentials.');
        }
      };

    const redirect = async event => {
        window.location.href = "http://localhost:3000/register"
    }


    

        return (
            <div className="container">
                <h1>Welcome to Graders</h1>
                 <div className="login-box">
                    <div className="login-form">
                        <form>
                            <h2>Login</h2>
                            <label className="login-input">
                                Username:
                                <input type="text" required="required" value={username} onChange={handleUsernameChange} />
                            </label>
                                <br />
                            <label className="login-input">
                                Password:
                                <input type="password" required="required" value={password} onChange={handlePasswordChange} />
                            </label>
                                <br />
                            <button className="login-button" type="submit" onClick={handleSubmit}>Login</button>
                            <button className="register-button" type="submit" onClick={redirect}>Register</button>
                        </form>
                    </div>    
                </div>
            </div>
        )
}

export default LoginPage