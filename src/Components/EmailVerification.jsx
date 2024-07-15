import React, { useState } from 'react';
import { isAuthenticated } from '../utils/AuthService';
import { useNavigate, Navigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleVerifyEmail = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}:5000/auth/verify/email?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                }
            });
            if (response.ok) {
                navigate('/dashboard');
            } else {
                console.error('Email verification failed.');
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }

    const handleResendVerification = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}:5000/auth/verify/send?email=${email}`);
            if (response.ok) {
                console.log('Verification link resent successfully.');
            } else {
                console.error('Failed to resend verification link.');
            }
        } catch (error) {
            console.error('Error during resend verification:', error);
        }
    };

    return (
        <div className="email-container">
            <h1>Email Verification</h1>
            <label>
                Email:
                <input type="text" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Token:
                <input type="text" value={token} onChange={handleTokenChange} />
            </label>
            <button onClick={handleVerifyEmail}>Verify Email</button>
            <button onClick={handleResendVerification}>Resend Verification Link</button>
        </div>
    );
};

export default EmailVerificationPage;