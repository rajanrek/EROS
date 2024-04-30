import {put, select, takeLatest} from 'redux-saga/effects';
import {PERSONAL_DETAILS, UPDATE_BASKET} from '../types/usersType';
import {
  getpersonalDetailAction,
  getpersonalDetailErrorAction,
  getpersonalDetailSuccessAction,
} from '../slices/personalDetailsSlice';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {Alert} from 'react-native';

// Generator function

function* personalDetailsSagas(action) {
  console.log(' personal action personalDetailsSagas in saga------', action);

  yield put(getpersonalDetailAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/PersonalDetails/${action.customerId}`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('personal detail category in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', 'Your personal details have been updated');
    }

    yield put(getpersonalDetailSuccessAction(response));
    yield put(getpersonalDetailAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getpersonalDetailErrorAction(error));
  }
}

// Generator function
export function* watchPersonalDetails() {
  yield takeLatest(PERSONAL_DETAILS, personalDetailsSagas);
}
