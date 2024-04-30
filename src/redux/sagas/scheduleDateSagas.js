import {put, select, takeLatest} from 'redux-saga/effects';
import {SCHEDULE_AUTO_DATE} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  postScheduleDateAction,
  postScheduleDateErrorAction,
  postScheduleDateSuccessAction,
} from '../slices/scheduleDateSlice';
import {Alert} from 'react-native';

// Generator function

function* scheduleDateSaga(action) {
  console.log(' action schedule date in saga------', action);

  yield put(postScheduleDateAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/ScheduleAutoReOrderDate`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('post schedule date in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData?.Message);
    }

    yield put(postScheduleDateSuccessAction(response));
    yield put(postScheduleDateAction(false));
  } catch (error) {
    console.log('api error', error);
    yield put(postScheduleDateErrorAction(error));
  }
}

// Generator function
export function* watchScheduleDate() {
  yield takeLatest(SCHEDULE_AUTO_DATE, scheduleDateSaga);
}
