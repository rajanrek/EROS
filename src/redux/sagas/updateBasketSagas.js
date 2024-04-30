import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {UPDATE_BASKET} from '../types/usersType';
import {
  getupdateBasketAction,
  getupdateBasketErrorAction,
  getupdateBasketSuccessAction,
} from '../slices/updateBasketSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* updateBasketSagas(action) {
  console.log(' update basket updateBasketSagas active in saga------', action);

  yield put(getupdateBasketAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  console.log("countryCode-----21", countryCode)
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/UpdateBasketQuantity`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('basket updateBasketSagas category in saga-----', response);
    yield put(getupdateBasketSuccessAction(response));
    yield put(getupdateBasketAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getupdateBasketErrorAction(error));
  }
}

// Generator function
export function* watchUpdateBasket() {
  yield takeLatest(UPDATE_BASKET, updateBasketSagas);
}
