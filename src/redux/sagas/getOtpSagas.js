import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import {GET_OTP} from "../types/usersType";
import { getotpAction, getotpErrorAction, getotpSuccessAction } from "../slices/getOtpSlice";
import { postApiCallWithNewParams } from "../../utils/ApiHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

// Generator function

function* getOtpSagas(action) {
  console.log('otp action in saga------',action)
    
    yield put(getotpAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/ValidateOTP`, json:action.payload})
    

    console.log('forgot pass in saga-----',response)
    if (response?.Errors != null && response?.Errors?.length > 0 && 
      response?.StatusCode == 100
      ) {
      Alert.alert('Invalid otp Please try again..');
    } else  {
      Alert.alert('Message', response?.StatusMessage);
    }
    yield put(getotpSuccessAction(response));
    yield put(getotpAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getotpErrorAction(error));
  }
}

// Generator function
export function* watchGetOtp() {
  yield takeLatest(GET_OTP, getOtpSagas);
}