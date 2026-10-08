// Action type constants for the auth feature.
// Kept as plain string constants so actions.js, reducer.js, and saga.js
// all reference the exact same values.

export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const REGISTER_REQUEST = "auth/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

export const VERIFY_OTP_REQUEST = "auth/VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "auth/VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "auth/VERIFY_OTP_FAILURE";

export const LOGOUT_REQUEST = "auth/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";

export const CLEAR_AUTH_ERROR = "auth/CLEAR_AUTH_ERROR";
