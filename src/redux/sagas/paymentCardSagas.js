import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {PAYMENT_CARD} from '../types/usersType';
import {
  getpaymentCardAction,
  getpaymentCardErrorAction,
  getpaymentCardSuccessAction,
} from '../slices/paymentCardSlice';
import {getApiCallwithNew} from '../../utils/ApiHandler';

// Generator function

function* getPaymentCardSagas(action) {
  console.log(' action get payment card Sagas in saga------', action);

  yield put(getpaymentCardAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/PaymentCards/${action.customerId}`,
      
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category payment card in saga-----', response);
    yield put(getpaymentCardSuccessAction(response));
    yield put(getpaymentCardAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getpaymentCardErrorAction(error));
  }
}

// Generator function
export function* watchPaymentCard() {
  yield takeLatest(PAYMENT_CARD, getPaymentCardSagas);
}
