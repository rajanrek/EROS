import {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getAddressBookAction,
  getAddressBookErrorAction,
  getAddressBookSuccessAction,
} from '../slices/addressBookSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {ADDRESS_BOOK} from '../types/usersType';

// Generator function

function* addressBookSagas(action) {
  console.log(' action address Book Sagas in saga------', action);

  yield put(getAddressBookAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/CustomerAddressBook`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('address book  success in saga-----', response);
    yield put(getAddressBookSuccessAction(response));
    yield put(getAddressBookAction(false));
  } catch (error) {
    console.log('address book error', error);

    yield put(getAddressBookErrorAction(error));
  }
}

// Generator function
export function* watchAddressBook() {
  yield takeLatest(ADDRESS_BOOK, addressBookSagas);
}
