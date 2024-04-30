import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { ACTIVE_CATEGORY} from "../types/usersType";
import { getActiveCategoryAction, getActiveCategoryErrorAction, getActiveCategorySuccessAction } from "../slices/activeCategorySlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postApiCallWithNewParams } from "../../utils/ApiHandler";

// Generator function

function* getActiveCategorySagas(action) {
  console.log(' action active in saga------',action)
    
    yield put(getActiveCategoryAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/GetShopScreenData`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getActiveCategorySagas succ-----',response)
    yield put(getActiveCategorySuccessAction(response));
    yield put(getActiveCategoryAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getActiveCategoryErrorAction(error));
  }
}

// Generator function
export function* watchGetActiveCategory() {
  yield takeLatest(ACTIVE_CATEGORY, getActiveCategorySagas);
}