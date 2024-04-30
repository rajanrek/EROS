import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {VIEW_REVIEW} from '../types/usersType';
import {
  getViewReviewAction,
  getViewReviewErrorAction,
  getViewReviewSuccessAction,
} from '../slices/viewReviewSlice';
import {getApiCallwithNew} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generator function

function* getviewReviewSagas(action) {
  console.log(' action getviewReviewSagas in saga------', action);

  yield put(getViewReviewAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/ProductReviews/`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getviewReviewSagas category in saga Success-----', response);
    yield put(getViewReviewSuccessAction(response));
    yield put(getViewReviewAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getViewReviewErrorAction(error));
  }
}

// Generator function
export function* watchViewReview() {
  yield takeLatest(VIEW_REVIEW, getviewReviewSagas);
}
