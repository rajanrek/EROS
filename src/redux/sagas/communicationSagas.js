import {put, select, takeLatest} from 'redux-saga/effects';
import {COMMUNICATION, COMMUNICATION_PREFERENCES} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  getcommunicationAction,
  getcommunicationErrorAction,
  getcommunicationSuccessAction,
} from '../slices/communicationSlice';
import {Alert} from 'react-native';

// Generator function

function* getCommunicationSaga(action) {
  console.log(' action communication Prefer in saga------', action);

  yield put(getcommunicationAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/ManageSubscription/${action.customerId}`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('communication prefer category in saga-----', response);

    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message','Save choices');
    }
    yield put(getcommunicationSuccessAction(response));
    yield put(getcommunicationAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getcommunicationErrorAction(error));
  }
}

// Generator function
export function* watchCommunicationPreference() {
  yield takeLatest(COMMUNICATION, getCommunicationSaga);
}
