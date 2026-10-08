import { call, put, takeLatest } from "redux-saga/effects";
import api from "../utils/axios.js";
import * as types from "./authactionTypes.js";
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  logoutSuccess,
} from "./authActions";

function persistSession(data) {
  localStorage.setItem("userInfo", JSON.stringify(data));
  localStorage.setItem("token", data.token);
}

function clearSession() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
}

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data } = yield call(api.post, "/auth/login", { email, password });
    persistSession(data);
    yield put(loginSuccess(data));
  } catch (error) {
    const responseData = error.response?.data;
    if (responseData?.needsVerification) {
      yield put(
        loginFailure({
          message:
            "Account not verified. A new OTP has been sent to your email.",
          needsVerification: true,
        }),
      );
    } else {
      yield put(
        loginFailure({ message: responseData?.message || "Login failed" }),
      );
    }
  }
}

function* registerSaga(action) {
  try {
    const { name, email, password } = action.payload;
    const { data } = yield call(api.post, "/auth/register", {
      name,
      email,
      password,
    });
    yield put(registerSuccess({ message: data.message, email }));
  } catch (error) {
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed"),
    );
  }
}

function* verifyOtpSaga(action) {
  try {
    const { email, otp } = action.payload;
    const { data } = yield call(api.post, "/auth/verify-otp", { email, otp });
    persistSession(data);
    yield put(verifyOtpSuccess(data));
  } catch (error) {
    yield put(
      verifyOtpFailure(
        error.response?.data?.message || "OTP verification failed",
      ),
    );
  }
}

function* logoutSaga() {
  clearSession();
  yield put(logoutSuccess());
}

export default function* authWatcherSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.REGISTER_REQUEST, registerSaga);
  yield takeLatest(types.VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(types.LOGOUT_REQUEST, logoutSaga);
}
