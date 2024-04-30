import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getsubmitReviewAction,
  getsubmitReviewErrorAction,
  getsubmitReviewSuccessAction,
} from '../slices/submitReviewSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUBMIT_REVIEW} from '../types/usersType';
import {Alert} from 'react-native';

// Generator function

function* submitReviewSagas(action) {
  console.log(' action submitReviewSagas in saga------', action);

  yield put(getsubmitReviewAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/SubmitProductReview`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log(
      'submit review submitReviewSagas category in saga-----',
      response,
    );
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData);
    }

    yield put(getsubmitReviewSuccessAction(response));
    yield put(getsubmitReviewAction(false));
  } catch (error) {
    console.log('api error', error);


    yield put(getsubmitReviewErrorAction(error));
  }
}

// Generator function
export function* watchSubmitReview() {
  yield takeLatest(SUBMIT_REVIEW, submitReviewSagas);
}
