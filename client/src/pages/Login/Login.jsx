import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginRequest,
  verifyOtpRequest,
  clearAuthError,
} from "../../store/authActions.js";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, needsVerification } = useSelector(
    (state) => state.auth,
  );

  // Reset any stale auth error/verification state when the page mounts
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // Navigate once login/OTP verification succeeds and the user is set
  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!needsVerification) {
      dispatch(loginRequest({ email, password }));
    } else {
      dispatch(verifyOtpRequest({ email, otp }));
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your Eventora account</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        {!needsVerification ? (
          <>
            <div>
              <label className="field-label">Email Address</label>
              <input
                type="email"
                required
                className="field-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input
                type="password"
                required
                className="field-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div>
            <label className="field-label">Verification Code (OTP)</label>
            <input
              type="text"
              required
              placeholder="6-digit code"
              className="field-input field-input-otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-block auth-submit"
        >
          {loading
            ? "Processing..."
            : needsVerification
              ? "Verify OTP & Log In"
              : "Sign In"}
        </button>
      </form>

      <p className="auth-footer-text">
        Don't have an account?{" "}
        <Link to="/register" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
