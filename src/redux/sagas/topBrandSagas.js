import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { PRODUCT_TYPE, TOP_BRANDS} from "../types/usersType";
import { getTopBrandAction, getTopBrandErrorAction, getTopBrandSuccessAction } from "../slices/topBrandSlice";
import {   postApiCallWithNewParams, postApiCallwithNew } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getTopBrandSagas(action) {
  console.log(' action in saga top brand------',action)
    
    yield put(getTopBrandAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GetTopBranch`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('top brand in saga-----',response)
    yield put(getTopBrandSuccessAction(response));
    yield put(getTopBrandAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getTopBrandErrorAction(error));
  }
}

// Generator function
export function* watchGetTopBrands() {
  yield takeLatest(TOP_BRANDS, getTopBrandSagas);
}