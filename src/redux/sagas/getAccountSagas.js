import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { GET_ACCOUNT_SCREEN} from "../types/usersType";
import { getAccountAction, getAccountErrorAction, getaccountSuccessAction } from "../slices/getAccountSlice";
import {   postApiCallWithNewParams, postApiCallwithNew } from "../../utils/ApiHandler";

// Generator function

function* getAccountSagas(action) {
  console.log(' action getAccountSagas in saga------',action)
    
    yield put(getAccountAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GetMyAccountData`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----',response)
    yield put(getaccountSuccessAction(response));
    yield put(getAccountAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getAccountErrorAction(error));
  }
}

// Generator function
export function* watchGetAccount() {
  yield takeLatest(GET_ACCOUNT_SCREEN, getAccountSagas);
}