class LoginFilter {

  static async teacherLogin(loginData) {
      const reqBody = {
          email: loginData.email,
          password: loginData.password,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      };
    
      try {
        const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/auth/login/email', requestOptions);
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('teacher_name', data.teacherUsername);
            window.location.href = '/dashboard';
          } else {
            throw new Error('JWT not present in the response');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
  }

  static async studentLogin(loginData) {
      const reqBody = {
          email: loginData.email,
          password: loginData.password,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      };
    
      try {
        const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/auth/student/login', requestOptions);
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('student_name', data.studentUsername);
            window.location.href = '/dashboard';
          } else {
            throw new Error('JWT not present in the response');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
  }

  static async basicLogin(loginData) {
      const reqBody = {
          email: loginData.email,
          password: loginData.password,
      };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      };
    
      try {
        const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/auth/login/basic', requestOptions);
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('username', data.username);
            window.location.href = '/dashboard';
          } else {
            throw new Error('JWT not present in the response');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      }
  }
}

export default LoginFilter;