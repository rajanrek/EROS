import { put, select, takeLatest } from "redux-saga/effects";

import {   getApiCallwithNew } from "../../utils/ApiHandler";
import { SECTION_ONE } from "../types/usersType";
import { getChooseOneAction, getChooseOneErrorAction, getChooseOneSuccessAction } from "../slices/chooseGlassOneSlice";

// Generator function

function* getChooseSectionOne(action) {
  console.log('getChooseSectionOne  saga------',action)
    
    yield put(getChooseOneAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/EyeGlassCategory`})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----',response)
    yield put(getChooseOneSuccessAction(response));
    yield put(getChooseOneAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getChooseOneErrorAction(error));
  }
}

// Generator function
export function* watchGetChooseSection() {
  yield takeLatest(SECTION_ONE, getChooseSectionOne);
}