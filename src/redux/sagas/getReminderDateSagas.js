import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {GET_REMINDER_DATE} from '../types/usersType';
import {
  getReminderDateAction,
  getReminderDateErrorAction,
  getReminderDateSuccessAction,
} from '../slices/getReminderDateSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';

// Generator function

function* getReminderDateSagas(action) {
  console.log(' action reminder date in saga------', action);

  yield put(getReminderDateAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/GetReorderReminderInterval`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('reminder date category in saga-----', response);
    yield put(getReminderDateSuccessAction(response));
    yield put(getReminderDateAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getReminderDateErrorAction(error));
  }
}

// Generator function
export function* watchGetReminderDate() {
  yield takeLatest(GET_REMINDER_DATE, getReminderDateSagas);
}
