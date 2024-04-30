import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { LAST_ORDER, MAKE_ORDERS} from "../types/usersType";
import { getmakeOrderAction, getmakeOrderErrorAction,  getmakeOrderSuccessAction } from "../slices/makeOrdersSlice";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getmakeOrdersSagas(action) {
  console.log('make order action in saga------',action)
    
    yield put(getmakeOrderAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/MakeOrder`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('make order in saga-----',response)
    yield put( getmakeOrderSuccessAction(response));
    yield put(getmakeOrderAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getmakeOrderErrorAction(error));
  }
}

// Generator function
export function* watchGetMakeOrders() {
  yield takeLatest(MAKE_ORDERS, getmakeOrdersSagas);
}