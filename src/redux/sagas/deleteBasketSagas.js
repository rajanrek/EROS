import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {DELETE_BASKET} from '../types/usersType';
import {
  getdeleteBasketAction,
  getdeleteBasketErrorAction,
  getdeleteBasketSuccessAction,
} from '../slices/deleteSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

// Generator function

function* deleteBasketSagas(action) {
  console.log(' action deleteBasketSagas in saga------', action);

  yield put(getdeleteBasketAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
0
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/PopupDeleteBasketItem`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('deleteBasketSagas category in saga-----', response);
    // if (response?.Errors != null && response?.Errors?.length > 0) {
    //   Alert.alert('Error', response?.Errors[0]);
    // } else {
    //   Alert.alert('Item Deleted from the Basket');
    // }
    yield put(getdeleteBasketSuccessAction(response));
    yield put(getdeleteBasketAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getdeleteBasketErrorAction(error));
  }
}

// Generator function
export function* watchDeleteBasket() {
  yield takeLatest(DELETE_BASKET, deleteBasketSagas);
}
