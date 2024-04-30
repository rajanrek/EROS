import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { GET_ORDER_HISTORY, GET_PRODUCT_ID} from "../types/usersType";
import {   getApiCallwithNew} from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductIdAction, getProductIdErrorAction, getProductIdSuccessAction } from "../slices/getProductIdSlice";
 
// Generator function
 
function* getProductIdSaga(action) {
  console.log(' action getProductIdSaga in saga------',action)
    
    yield put(getProductIdAction(true));

    const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

 
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/GetProductId/`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));
 
    console.log('product Id Saga Success-----',response)
    yield put(getProductIdSuccessAction(response));
    yield put(getProductIdAction(false));
 
  } catch (error) {
    console.log("api error", error)
 
    yield put(getProductIdErrorAction(error));
  }
}
 
// Generator function
export function* watchGetProductId() {
  yield takeLatest(GET_PRODUCT_ID, getProductIdSaga);
}