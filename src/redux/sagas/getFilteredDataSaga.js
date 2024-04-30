import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { GET_FILTER, GET_FILTERED_DATA, GET_Filter} from "../types/usersType";
import {   getApiCallwithNew, postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFilteredAction, getFilteredErrorAction, getFilteredSuccessAction } from "../slices/getFilteredDataSlice";

// Generator function

function* getFilteredSaga(action) {
  console.log(' action getFilterSaga in saga------',action)
    
    yield put(getFilteredAction(true));

  try {
const response = yield getApiCallwithNew({url:action.endPoint, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----',response)
    yield put(getFilteredSuccessAction(response));
    yield put(getFilteredAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getFilteredErrorAction(error));
  }
}

// Generator function
export function* watchGetFiltered() {
  yield takeLatest(GET_FILTERED_DATA, getFilteredSaga);
}