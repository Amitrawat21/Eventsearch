import { all, fork } from "redux-saga/effects";
import authWatcherSaga from "./authSaga.js";

export default function* rootSaga() {
  yield all([fork(authWatcherSaga)]);
}
