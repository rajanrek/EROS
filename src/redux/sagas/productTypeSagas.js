import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {PRODUCT_TYPE} from '../types/usersType';
import {
  getproductTypeAction,
  getproductTypeErrorAction,
  getproductTypeSuccessAction,
} from '../slices/productTypeSlice';
import {
  postApiCallWithNewParams,
  postApiCallwithNew,
} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getproductTypeSagas(action) {
  console.log('product type action in saga------', action);

  yield put(getproductTypeAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/GetProductType`,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('product type in saga-----', response);
    yield put(getproductTypeSuccessAction(response));
    yield put(getproductTypeAction(false));
  } catch (error) {
    console.log('api error product type', error);

    yield put(getproductTypeErrorAction(error));
  }
}

// Generator function
export function* watchGetProductType() {
  yield takeEvery(PRODUCT_TYPE, getproductTypeSagas);
}
