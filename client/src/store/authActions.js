import * as types from "./authActionTypes";

// Login
export const loginRequest = ({ email, password }) => ({
  type: types.LOGIN_REQUEST,
  payload: { email, password },
});
export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});
export const loginFailure = ({ message, needsVerification }) => ({
  type: types.LOGIN_FAILURE,
  payload: { message, needsVerification },
});

// Register
export const registerRequest = ({ name, email, password }) => ({
  type: types.REGISTER_REQUEST,
  payload: { name, email, password },
});
export const registerSuccess = ({ message, email }) => ({
  type: types.REGISTER_SUCCESS,
  payload: { message, email },
});
export const registerFailure = (message) => ({
  type: types.REGISTER_FAILURE,
  payload: message,
});

// OTP verification (shared by login + register flows)
export const verifyOtpRequest = ({ email, otp }) => ({
  type: types.VERIFY_OTP_REQUEST,
  payload: { email, otp },
});
export const verifyOtpSuccess = (user) => ({
  type: types.VERIFY_OTP_SUCCESS,
  payload: user,
});
export const verifyOtpFailure = (message) => ({
  type: types.VERIFY_OTP_FAILURE,
  payload: message,
});

// Logout
export const logoutRequest = () => ({ type: types.LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS });

// Misc
export const clearAuthError = () => ({ type: types.CLEAR_AUTH_ERROR });
