import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongSuccess,
  createSongRequest,
  updateSongSuccess,
  updateSongRequest,
  deleteSongSuccess,
  deleteSongRequest,
} from "./songsSlice";

const API_URL = "http://localhost:5000/songs";

// Fetch all songs
function* fetchSongs() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Create a new song
function* createSong(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(createSongSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

function* updateSong(action) {
  try {
    const { id, ...songData } = action.payload;
    const response = yield call(axios.put, `${API_URL}/${id}`, songData);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

function* deleteSong(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    console.error(error);
  }
}

// Watcher Saga
export default function* songsSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongs);
  yield takeEvery(createSongRequest.type, createSong);
  yield takeEvery(updateSongRequest.type, updateSong);
  yield takeEvery(deleteSongRequest.type, deleteSong);
}
