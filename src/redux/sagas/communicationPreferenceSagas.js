import {put, select, takeLatest} from 'redux-saga/effects';
import {COMMUNICATION_PREFERENCES} from '../types/usersType';
import {getApiCallwithNew} from '../../utils/ApiHandler';
import {
  getcommunicationPreferenceAction,
  getcommunicationPreferenceErrorAction,
  getcommunicationPreferenceSuccessAction,
} from '../slices/communicationPreferenceSlice';

// Generator function

function* getCommunicationPreferenceSaga(action) {
  console.log(' action communication in saga------', action);

  yield put(getcommunicationPreferenceAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/ManageSubscription/${action.customerId}`,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('communication category in saga-----', response);
    yield put(getcommunicationPreferenceSuccessAction(response));
    yield put(getcommunicationPreferenceAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getcommunicationPreferenceErrorAction(error));
  }
}

// Generator function
export function* watchCommunication() {
  yield takeLatest(COMMUNICATION_PREFERENCES, getCommunicationPreferenceSaga);
}
