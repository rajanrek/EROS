import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {GET_CONTACT_DETAILS} from '../types/usersType';
import {
  getContactDetailsAction,
  getContactDetailsErrorAction,
  getContactDetailsSuccessAction,
} from '../slices/getContactDetailsSlice';
import {getApiCallwithNew} from '../../utils/ApiHandler';

// Generator function

function* getContactDetailsSagas(action) {
  console.log(' action get contact Detail Sagas in saga------', action);

  yield put(getContactDetailsAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/ContactDetails`,
      
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category contact Detail  in saga-----', response);
    yield put(getContactDetailsSuccessAction(response));
    yield put(getContactDetailsAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getContactDetailsErrorAction(error));
  }
}

// Generator function
export function* watchContactDetails() {
  yield takeLatest(GET_CONTACT_DETAILS, getContactDetailsSagas);
}
