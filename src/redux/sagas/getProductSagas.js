import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import {GET_PRODUCT} from "../types/usersType";
import { getProductAction, getProductErrorAction, getProductSuccessAction } from "../slices/getProductSlice";
import { getApiCallwithNew  } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getProductSagas(action) {
  console.log('get product action in saga------',action)
  yield put(getProductAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/GetProducts/`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('get product in saga resp-----',response)
    yield put(getProductSuccessAction(response?.ResultData));
    yield put(getProductAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getProductErrorAction(error));
  }
}

// Generator function
export function* watchGetProduct() {
  yield takeLatest(GET_PRODUCT, getProductSagas);
}