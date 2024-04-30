import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {CUSTOMER_FEEDBACK} from '../types/usersType';
import {
  getcustomerFeedbackAction,
  getcustomerFeedbackErrorAction,
  getcustomerFeedbackSuccessAction,
} from '../slices/customerFeedbackSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {Alert} from 'react-native';

// Generator function

function* customerFeedbackSagas(action) {
  console.log(' action customer feedback in saga------', action);

  yield put(getcustomerFeedbackAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/CustomerFeedback`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('active category customer feedback in saga-----', response);

    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData);
    }

    yield put(getcustomerFeedbackSuccessAction(response));
    yield put(getcustomerFeedbackAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getcustomerFeedbackErrorAction(error));
  }
}

// Generator function
export function* watchCustomerFeedback() {
  yield takeLatest(CUSTOMER_FEEDBACK, customerFeedbackSagas);
}
