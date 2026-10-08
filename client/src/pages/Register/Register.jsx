import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  clearAuthError,
  verifyOtpRequest,
  registerRequest,
} from "../../store/authActions";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, registrationSuccess } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registrationSuccess) {
      dispatch(registerRequest({ name, email, password }));
    } else {
      dispatch(verifyOtpRequest({ email, otp }));
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Join Eventora today</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form auth-form-tight">
        {!registrationSuccess ? (
          <>
            <div>
              <label className="field-label">Full Name</label>
              <input
                type="text"
                required
                className="field-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <p className="alert alert-success auth-otp-note">
              An OTP has been sent to your email. Please verify your account.
            </p>
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
            : registrationSuccess
              ? "Verify & Complete"
              : "Sign Up"}
        </button>
      </form>

      {!registrationSuccess && (
        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
};

export default Register;
