import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import {COMFI_PRODUCT} from "../types/usersType";
import { getComfiProductAction, getComfiProductErrorAction, getComfiProductSuccessAction } from "../slices/comfiProductSlice";
import {   postApiCallWithNewParams, postApiCallwithNew } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getComfiProductSagas(action) {
  console.log(' action getComfiProductSagas in saga------',action)
    
    yield put(getComfiProductAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GetTopComfiProduct`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('cpmfi product in saga-----',response)
    yield put(getComfiProductSuccessAction(response));
    yield put(getComfiProductAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getComfiProductErrorAction(error));
  }
}

// Generator function
export function* watchGetComfiProduct() {
  yield takeLatest(COMFI_PRODUCT, getComfiProductSagas);
}