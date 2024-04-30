import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { GET_FILTER, GET_Filter} from "../types/usersType";
import { getFilterAction, getFilterErrorAction, getFilterSuccessAction } from "../slices/getFilterSlice";
import {   getApiCallwithNew, postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getFilterSaga(action) {
  console.log(' action getFilterSaga in saga------',action)
    
    yield put(getFilterAction(true));

  try {
const response = yield getApiCallwithNew({url:action.endPoint, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----',response)
    yield put(getFilterSuccessAction(response));
    yield put(getFilterAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getFilterErrorAction(error));
  }
}

// Generator function
export function* watchGetFilter() {
  yield takeLatest(GET_FILTER, getFilterSaga);
}