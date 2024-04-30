import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getaddressUpdateAction,
  getaddressUpdateErrorAction,
  getaddressUpdateSuccessAction,
} from '../slices/addressUpdateSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {UPDATE_ADDRESS} from '../types/usersType';
import {Alert} from 'react-native';

// Generator function

function* updateAddressSagas(action) {
  console.log(' action update address Sagas in saga------', action);

  yield put(getaddressUpdateAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/UpdateAddress`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('update address  success in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', 'Address updated successfully..');
    }
    yield put(getaddressUpdateSuccessAction(response));
    yield put(getaddressUpdateAction(false));
  } catch (error) {
    console.log('update address success error', error);


    yield put(getaddressUpdateErrorAction(error));
  }
}

// Generator function
export function* watchUpdateAddress() {
  yield takeLatest(UPDATE_ADDRESS, updateAddressSagas);
}
