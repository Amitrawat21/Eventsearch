import * as types from "./authactionTypes.js";

const storedUser = localStorage.getItem("userInfo");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
  needsVerification: false,
  registrationSuccess: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, error: null, needsVerification: false };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        needsVerification: false,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        needsVerification: !!action.payload.needsVerification,
      };

    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        registrationSuccess: false,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registrationSuccess: true,
        error: null,
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        registrationSuccess: false,
      };

    case types.VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null };
    case types.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
        needsVerification: false,
        registrationSuccess: false,
      };
    case types.VERIFY_OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        needsVerification: false,
        registrationSuccess: false,
      };

    case types.CLEAR_AUTH_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}
