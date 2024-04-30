import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getnewAddressAction,
  getnewAddressErrorAction,
  getnewAddressSuccessAction,
} from '../slices/newAddressSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {NEW_ADDRESS} from '../types/usersType';
import {Alert} from 'react-native';

// Generator function

function* newAddressSagas(action) {
  console.log(' action new address Sagas in saga------', action);

  yield put(getnewAddressAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/AddNewAddress`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('new address  success in saga-----', response);
  
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', 'New Address added successfully..');
    }
    yield put(getnewAddressSuccessAction(response));
    yield put(getnewAddressAction(false));
  } catch (error) {
    console.log('new address success error', error);


    yield put(getnewAddressErrorAction(error));
  }
}

// Generator function
export function* watchNewAddress() {
  yield takeLatest(NEW_ADDRESS, newAddressSagas);
}
