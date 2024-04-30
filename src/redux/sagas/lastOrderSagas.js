import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { LAST_ORDER} from "../types/usersType";
import { getlastOrderAction, getlastOrderErrorAction, getlastOrderSuccessAction } from "../slices/lastOrderSlice";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getlastOrderSagas(action) {
  console.log('last order action in saga------',action)
    
    yield put(getlastOrderAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/CustomerOrder`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('last order in saga-----',response)
    yield put(getlastOrderSuccessAction(response));
    yield put(getlastOrderAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getlastOrderErrorAction(error));
  }
}

// Generator function
export function* watchGetLastOrder() {
  yield takeLatest(LAST_ORDER, getlastOrderSagas);
}