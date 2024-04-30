import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {FORGOT_PASSWORD} from '../types/usersType';
import {
  getforgotPassAction,
  getforgotPassErrorAction,
  getforgotPassSuccessAction,
} from '../slices/forgotPassSlice';
import {postApiCall, postApiCallwithNew} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

// Generator function

function* getForgotPassSagas(action) {
  console.log('forgot action in saga------', action);

  yield put(getforgotPassAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  console.log('country ---------', countryCode);
  try {
    const response = yield postApiCallwithNew({
      url: `gbp/ResetPasswordOTP/`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('forgot pass in saga-success----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData);
    }
    yield put(getforgotPassSuccessAction(response));
    yield put(getforgotPassAction(false));
  } catch (error) {
    console.log('api  forgot error', error);

    yield put(getforgotPassErrorAction(error));
  }
}

// Generator function
export function* watchGetForgotpass() {
  yield takeLatest(FORGOT_PASSWORD, getForgotPassSagas);
}
