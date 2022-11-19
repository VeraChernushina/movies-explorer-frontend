import { put, call, takeEvery } from 'redux-saga/effects';

import { getSavedMovies } from "../utils/MainApi";
import { USER_MOVIES_FETCH_FAILED, USER_MOVIES_FETCH_REQUESTED, USER_MOVIES_FETCH_SUCCEDED } from "./actions";

function* fetchUserMovies(action) {
  try {
    const userMovies = yield call(getSavedMovies, action.payload.userId);
    yield put({
      type: USER_MOVIES_FETCH_SUCCEDED,
      payload: {
        data: userMovies,
      }
    })
  } catch(err) {
    yield put({
      type: USER_MOVIES_FETCH_FAILED,
      payload: {
        message: err.message,
      }
    })
  }
}

export function* saga() {
  yield takeEvery(USER_MOVIES_FETCH_REQUESTED, fetchUserMovies)
}