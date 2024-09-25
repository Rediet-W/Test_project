import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./songsSlice";
import songsSaga from "./songsSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Set up the store
const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  // The middleware should be a function that adds sagaMiddleware along with the default middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(songsSaga);

export default store;
