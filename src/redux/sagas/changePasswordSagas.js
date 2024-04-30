import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_PASSWORD} from '../types/usersType';
import {
  getchangePasswordAction,
  getchangePasswordErrorAction,
  getchangePasswordSuccessAction,
} from '../slices/changePasswordSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

// Generator function

function* changePasswordSagas(action) {
  console.log(' change action changePasswordSagas in saga------', action);

  yield put(getchangePasswordAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/ChangePassword`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('changePasswordSagas category in saga-----', response);

    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', 'Password changed successfully');
    }

    yield put(getchangePasswordSuccessAction(response));
    yield put(getchangePasswordAction(false));
  } catch (error) {
    console.log('api error', error);


    yield put(getchangePasswordErrorAction(error));
  }
}

// Generator function
export function* watchchangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSagas);
}
