import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import {REGISTER_USER} from '../types/usersType';
import {
  getRegisterUserAction,
  getRegisterUserErrorAction,
  getRegisterUserSuccessAction,
} from '../slices/registerSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getUserSuccessAction} from '../slices/userSlice';

// Generator function

function* getRegisterUserSaga(action) {
  yield put(getRegisterUserAction(true));

  try {
    const response = yield postApiCallWithNewParams({
      url: 'RegisterMobileCustomer',
      json: action.payload,
      reqType:true
    });

    let token = JSON.stringify(response);
    yield AsyncStorage.setItem('token', token);
console.log("token in register saga----",  token)


    // yield put(getUserSuccessAction(response));
    yield put(getRegisterUserSuccessAction(response));
    yield put(getRegisterUserAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getRegisterUserErrorAction(error));
  }
}

// Generator function
export function* watchGetRegistertUser() {
  yield takeLatest(REGISTER_USER, getRegisterUserSaga);
}
