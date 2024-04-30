
import { put, select, takeLatest } from "redux-saga/effects";
import {PREFERENCES_SELECTION} from "../types/usersType";
import { getPreferencesAction, getPreferencesErrorAction, getPreferencesSuccessAction } from "../slices/preferencesSlice";
import { getApiCall, postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getPrefrencesSagas(action) {
  console.log('preferences action in saga------',action)
    
    yield put(getPreferencesAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;


   yield console.log("prefreneces countryCode--", countryCode)
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/SavePreferences`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('preferences in saga-----',response)
    yield put(getPreferencesSuccessAction(response));
    yield put(getPreferencesAction(false));

  } catch (error) {
    console.log("preferences api error", error)

    yield put(getPreferencesErrorAction(error));
  }
}

// Generator function
export function* watchPreferences() {
  yield takeLatest(PREFERENCES_SELECTION, getPrefrencesSagas);
}