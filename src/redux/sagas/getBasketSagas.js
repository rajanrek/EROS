import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { GET_BASKET} from "../types/usersType";
import { getBasketAction, getBasketErrorAction, getBasketSuccessAction } from "../slices/getBasketSlice";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getBasketSagas(action) {
  console.log(' action getBasketSagas in saga------',action)
    
    yield put(getBasketAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/Basket`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----',response)
    yield put(getBasketSuccessAction(response));
    yield put(getBasketAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getBasketErrorAction(error));
  }
}

// Generator function
export function* watchGetBasket() {
  yield takeLatest(GET_BASKET, getBasketSagas);
}