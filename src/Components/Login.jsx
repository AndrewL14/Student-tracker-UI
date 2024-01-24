import React, { useState } from "react";
import LoginFilter from "../services/LoginFilter";

function LoginPage(props) {
  const [feild1, setUsername] = useState("");
  const [feild2, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     console.log('submitted:', { username, password });

  //     const reqBody = { username, password };
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(reqBody),
  //     };

  //     try {
  //       const response = await fetch('http://localhost:8000/auth/login', requestOptions);

  //       if (response.ok) {
  //         const data = await response.json();

  //         if (data.jwt) {
  //           localStorage.setItem('jwt', data.jwt);
  //           localStorage.setItem('teacher_name', data.teacherUsername);
  //           window.location.href = 'http://localhost:3000/dashboard';
  //         } else {
  //           throw new Error('JWT not present in the response');
  //         }
  //       } else {
  //         throw new Error('Invalid username or password');
  //       }
  //     } catch (error) {
  //       console.error('Login error:', error);
  //       alert('Login failed. Please check your credentials.');
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted:", { feild1, feild2 });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const loginData = { feild1, feild2 };

    if (emailRegex.test(loginData.feild1)) {
      LoginFilter.emailLogin(loginData);
    } else {
      LoginFilter.usernameLogin(loginData);
    }
  };

  const redirect = async (event) => {
    window.location.href = "http://localhost:3000/register";
  };

  return (
    <div className="container">
      <h1>Welcome to Graders</h1>
      <div className="login-box">
        <div className="login-form pad-login">
          <form>
            <h2>Login</h2>
            <div className="login-input">
              <label>Username or Email:</label>
              <input
                type="text"
                required="required"
                value={feild1}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="login-input">
              <label>Password:</label>

              <input
                type="password"
                required="required"
                value={feild2}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="login-button"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
            <button
              className="register-button"
              type="submit"
              onClick={redirect}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
