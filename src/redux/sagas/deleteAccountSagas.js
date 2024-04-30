import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {DELETE_ACCOUNT} from '../types/usersType';
import {
  getdeleteAccountAction,
  getdeleteAccountErrorAction,
  getdeleteAccountSuccessAction,
} from '../slices/deleteAccountSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {Alert} from 'react-native';

// Generator function

function* deleteAccountSagas(action) {
  console.log(' action delete Account Sagas in saga------', action);

  yield put(getdeleteAccountAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/DeleteAccount/${action.customerId}`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('deleteAccountSagas category in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message','Account Deleted');
    }

    yield put(getdeleteAccountSuccessAction(response));
    yield put(getdeleteAccountAction(false));
  } catch (error) {
    console.log('delete account api error', error);

    yield put(getdeleteAccountErrorAction(error));
  }
}

// Generator function
export function* watchDeleteAccount() {
  yield takeLatest(DELETE_ACCOUNT, deleteAccountSagas);
}
