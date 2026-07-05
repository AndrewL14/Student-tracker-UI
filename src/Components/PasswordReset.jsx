import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Demo flow — no backend. Step 1 "sends" a code, step 2 "resets".
    const handleInitiate = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setError('');
        setMessage('We sent a reset code to your email. (Demo: enter any code below.)');
        setStep(2);
    };

    const handleReset = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="brand-logo">G</span>
                    Graders
                </div>
                <h1 className="auth-title">Reset password</h1>
                <p className="auth-subtitle">
                    {step === 1
                        ? "Enter your email and we'll send a reset code."
                        : 'Enter your code and choose a new password.'}
                </p>

                {error && <div className="alert alert-error">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                {step === 1 ? (
                    <form className="auth-form" onSubmit={handleInitiate}>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="you@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block" type="submit">Send reset code</button>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleReset}>
                        <div className="form-group">
                            <label className="form-label">Reset code</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="e.g. 428193"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">New password</label>
                            <input
                                className="form-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm password</label>
                            <input
                                className="form-input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block" type="submit">Reset password</button>
                    </form>
                )}

                <p className="auth-footer">
                    <button type="button" className="link-btn" onClick={() => navigate('/')}>
                        Back to sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default PasswordReset;
