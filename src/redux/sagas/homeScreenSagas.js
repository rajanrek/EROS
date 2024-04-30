import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, takeLatest,select } from "redux-saga/effects";
import { HOME_SCREEN} from "../types/usersType";
import { getHomeScreenAction, getHomeScreenErrorAction, getHomeScreenSuccessAction } from "../slices/homeScreenSlice";
import {   postApiCallWithNewParams, postApiCallwithNew } from "../../utils/ApiHandler";

// Generator function

function* homeScreenSagas(action) {
  console.log(' action homeScreenSagas in saga------',action)
    
    yield put(getHomeScreenAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GetHomeScreenData`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('homeScreenSagas category in saga-----',response)
    yield put(getHomeScreenSuccessAction(response));
    yield put(getHomeScreenAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getHomeScreenErrorAction(error));
  }
}

// Generator function
export function* watchHomeScreen() {
  yield takeLatest(HOME_SCREEN, homeScreenSagas);
}