import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getaddressRemoveAction,
  getaddressRemoveErrorAction,
  getaddressRemoveSuccessAction,
} from '../slices/addressRemoveSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {REMOVE_ADDRESS} from '../types/usersType';
import {Alert} from 'react-native';

// Generator function

function* removeAddressSagas(action) {
  console.log(' action remove address Sagas in saga------', action);

  yield put(getaddressRemoveAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/DeleteAddress`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('remove address  success in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', 'Address removed successfully..');
    }

    yield put(getaddressRemoveSuccessAction(response));
    yield put(getaddressRemoveAction(false));
  } catch (error) {
    console.log('remove address success error', error);


    yield put(getaddressRemoveErrorAction(error));
  }
}

// Generator function
export function* watchRemoveAddress() {
  yield takeLatest(REMOVE_ADDRESS, removeAddressSagas);
}
