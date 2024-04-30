import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { getaddBasketAction, getaddBasketErrorAction, getaddBasketPackageSuccessAction, getaddBasketSuccessAction } from "../slices/addToBasketSlice";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TO_BASKET } from "../types/usersType";
import { Alert } from "react-native";
import { getBasketTokenAction } from "../slices/loginUserSlice";
import Globals from "../../utils/constant";

// Generator function

function* addBasketSagas(action) {
  console.log(' action addBasketSagas in saga------',action)
    
    yield put(getaddBasketAction(true));

  try {
const response = yield postApiCallWithNewParams({url:action.endPoint, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));
let ResultData;
yield  ResultData={
  loginResponse:response
}
yield AsyncStorage.setItem('userBasketData', JSON.stringify(ResultData));

    console.log('add basket success in saga-----',response)
    if(response.ResultData?.BasketId){
      yield put(getBasketTokenAction(response.ResultData?.BasketId));
     yield Globals.globalBasket = response.ResultData?.BasketId
    }
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert(response?.Errors[0]);
    } 
    // else {
    //   Alert.alert('Item added in the Basket');
    // }
    if(action.from === 'package'){
    yield put(getaddBasketPackageSuccessAction(response));
    yield put(getaddBasketAction(false));

    }else{
      yield put(getaddBasketSuccessAction(response));
      yield put(getaddBasketAction(false));

    }

  } catch (error) {
    console.log("add basket error", error)

    yield put(getaddBasketErrorAction(error));
  }
}

// Generator function
export function* watchAddBasket() {
  yield takeLatest(ADD_TO_BASKET, addBasketSagas);
}