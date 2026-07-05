import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/AuthService';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }

    // Demo flow: any 6+ character code "verifies" successfully.
    const handleVerify = (e) => {
        e.preventDefault();
        if (token.trim().length >= 6) {
            setMessage('');
            navigate('/dashboard');
        } else {
            setMessage('Enter the 6-digit code we sent to your inbox.');
        }
    };

    const handleResend = () => {
        setMessage('A new verification code has been sent. (Demo: enter any 6+ characters.)');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="brand-logo">G</span>
                    Graders
                </div>
                <h1 className="auth-title">Verify your email</h1>
                <p className="auth-subtitle">
                    Enter the confirmation code sent to your address.
                </p>

                {message && <div className="alert alert-success">{message}</div>}

                <form className="auth-form" onSubmit={handleVerify}>
                    <div className="form-group">
                        <label className="form-label">Verification code</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="e.g. 428193"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Verify email</button>
                </form>

                <div className="auth-divider">didn't get it?</div>
                <button className="btn btn-outline btn-block" type="button" onClick={handleResend}>
                    Resend code
                </button>

                <p className="auth-footer">
                    <button type="button" className="link-btn" onClick={() => navigate('/dashboard')}>
                        Skip for now
                    </button>
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
