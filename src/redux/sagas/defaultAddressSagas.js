import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getdefaultAddressAction,
  getdefaultAddressErrorAction,
  getdefaultAddressSuccessAction,
} from '../slices/defaultAddressSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {DEFAULT_ADDRESS} from '../types/usersType';

// Generator function

function* defaultAddressSagas(action) {
  console.log(' action default address Sagas in saga------', action);

  yield put(getdefaultAddressAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/SetDefaultAddress`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('default address success in saga-----', response);
    yield put(getdefaultAddressSuccessAction(response));
    yield put(getdefaultAddressAction(false));
  } catch (error) {
    console.log('default Address error', error);

    yield put(getdefaultAddressErrorAction(error));
  }
}

// Generator function
export function* watchDefaultAddress() {
  yield takeLatest(DEFAULT_ADDRESS, defaultAddressSagas);
}
