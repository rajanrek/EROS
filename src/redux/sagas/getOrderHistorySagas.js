import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { GET_ORDER_HISTORY} from "../types/usersType";
import { getOrderHistoryAction, getOrderHistoryErrorAction, getOrderHistorySuccessAction } from "../slices/getOrderHistorySlice";
import {   getApiCallwithNew} from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getOrderHistorySagas(action) {
  console.log(' action getOrderHistorySagas in saga------',action)
    
    yield put(getOrderHistoryAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/OrderHistory/`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----',response)
    yield put(getOrderHistorySuccessAction(response));
    yield put(getOrderHistoryAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getOrderHistoryErrorAction(error));
  }
}

// Generator function
export function* watchGetOrderHistory() {
  yield takeLatest(GET_ORDER_HISTORY, getOrderHistorySagas);
}