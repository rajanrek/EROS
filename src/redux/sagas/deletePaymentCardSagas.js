import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {DELETE_PAYMENT_CARD} from '../types/usersType';
import {
  deletePaymentCardAction,
  deletePaymentCardErrorAction,
  deletePaymentCardSuccessAction,
} from '../slices/deletePaymentCardSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {Alert} from 'react-native';

// Generator function

function* deletePaymentCardSagas(action) {
  console.log(' action delete payment card Sagas in saga------', action);

  yield put(deletePaymentCardAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/DeletePaymentCards`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('delete payment Sagas category in saga-----', response);
    yield put(deletePaymentCardSuccessAction(response));

    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', 'Successfully Removed');
    }
    yield put(deletePaymentCardAction(false));
  } catch (error) {
    console.log('delete payment api error', error);

    yield put(deletePaymentCardErrorAction(error));
  }
}

// Generator function
export function* watchDeletePaymentCard() {
  yield takeLatest(DELETE_PAYMENT_CARD, deletePaymentCardSagas);
}
