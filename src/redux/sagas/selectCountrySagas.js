import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getselectCountryAction,
  getselectCountryErrorAction,
  getselectCountrySuccessAction,
} from '../slices/selectCountrySlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {SELECT_COUNTRY} from '../types/usersType';

// Generator function

function* selectCountrySagas(action) {
  console.log(' action select country Sagas in saga------', action);

  yield put(getselectCountryAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/DeliveryCountry`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('select country success in saga-----', response);
    yield put(getselectCountrySuccessAction(response));
    yield put(getselectCountryAction(false));
  } catch (error) {
    console.log('select country error', error);

    yield put(getselectCountryErrorAction(error));
  }
}

// Generator function
export function* watchSelectCountry() {
  yield takeLatest(SELECT_COUNTRY, selectCountrySagas);
}
