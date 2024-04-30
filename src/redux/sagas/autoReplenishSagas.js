import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {AUTO_REPLENISH} from '../types/usersType';
import {
  getReplenishAction,
  getReplenishErrorAction,
  getReplenishSuccessAction,
} from '../slices/autoReplenishSlice';
import {getApiCallwithNew} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getAutoReplenishSagas(action) {
  console.log(' action getAutoReplenishSagas in saga------', action);

  yield put(getReplenishAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/AutoReplenishOrders/`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category in saga-----', response);
    yield put(getReplenishSuccessAction(response));
    yield put(getReplenishAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getReplenishErrorAction(error));
  }
}

// Generator function
export function* watchGetAutoReplenish() {
  yield takeLatest(AUTO_REPLENISH, getAutoReplenishSagas);
}
