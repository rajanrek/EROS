
import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {postApiCallWithNewParams } from "../../utils/ApiHandler";

import { getStockAction, getStockDataErrorAction, getStockDataSuccessAction } from "../slices/getStockSlice";
import { GET_STOCK } from "../types/usersType";

// Generator function

function* getStockSaga(action) {
  console.log(' action getStockSaga in saga------',action)
    
    yield put(getStockAction(true));

  try {
const response = yield postApiCallWithNewParams({url:action.endPoint, json:action.payload})
    
    console.log(' getStockSaga success in saga-----',response)
    yield put(getStockDataSuccessAction(response));
    yield put(getStockAction(false));

  } catch (error) {
    console.log("getStockSaga error", error)

    yield put(getStockDataErrorAction(error));
  }
}

// Generator function
export function* watchGetStock() {
  yield takeLatest(GET_STOCK, getStockSaga);
}