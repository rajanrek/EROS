import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import {LOGIN_USER} from '../types/usersType';
import {
  getBasketTokenAction,
  getLoginUserAction,
  getLoginUserErrorAction,
  getLoginUserSuccessAction,
} from '../slices/loginUserSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Generator function

function* getLoginUserSaga(action) {
  console.log('login action in saga------', action);

  yield put(getLoginUserAction(true));
  try {
    const response = yield postApiCallWithNewParams({
      url: 'Login',
      json: action.payload,
      reqType: true,
    });
    let token = JSON.stringify(response);
    yield AsyncStorage.setItem('token', token);

    console.log('login response in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Message', response?.Errors[0]);
    } 
     if(response.ResultData?.BasketId){
      yield put(getBasketTokenAction(response.ResultData?.BasketId));
    }
    yield put(getLoginUserSuccessAction(response));
    yield put(getLoginUserAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getLoginUserErrorAction(error));
  }
}

// Generator function
export function* watchGetLoginUser() {
  yield takeLatest(LOGIN_USER, getLoginUserSaga);
}
