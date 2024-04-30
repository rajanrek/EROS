import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {NEW_PASSWORD} from '../types/usersType';
import {
  getnewPassAction,
  getnewPassErrorAction,
  getnewPassSuccessAction,
} from '../slices/newPassSlice';
import {
  postApiCall,
  postApiCallWithNewParams,
  postApiCallwithNew,
} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Generator function

function* getNewPassSagas(action) {
  yield put(getnewPassAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/UpdatePassword`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('new pass in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.StatusMessage);
    }
    yield put(getnewPassSuccessAction(response));
    yield put(getnewPassAction(false));
  } catch (error) {
    console.log('new pass api error', error);

    yield put(getnewPassErrorAction(error));
  }
}

// Generator function
export function* watchNewPass() {
  yield takeLatest(NEW_PASSWORD, getNewPassSagas);
}
