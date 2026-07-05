import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFilter from "../services/LoginFilter";
import localDb from "../services/localDb";

function LoginPage() {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            await LoginFilter.login({ identifier, password });
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDemo = () => {
        localDb.loginDemo();
        navigate("/dashboard");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="brand-logo">G</span>
                    Graders
                </div>
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to your gradebook</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username or email</label>
                        <input
                            className="form-input"
                            type="text"
                            placeholder="you@school.edu"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-links">
                        <span />
                        <button
                            type="button"
                            className="link-btn"
                            onClick={() => navigate("/password-reset")}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <div className="auth-divider">or</div>

                <button className="btn btn-outline btn-block" type="button" onClick={handleDemo}>
                    Try the live demo
                </button>

                <div className="demo-hint">
                    Explore instantly with the demo account —
                    <strong> demo_teacher</strong> / <strong>demo123</strong>. All data is
                    saved right in your browser.
                </div>

                <p className="auth-footer">
                    New here?{" "}
                    <button type="button" className="link-btn" onClick={() => navigate("/register")}>
                        Create an account
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
