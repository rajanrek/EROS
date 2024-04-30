import {put, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_SCHEDULE_AUTO_DATE} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  postChangeScheduleDateAction,
  postChangeScheduleDateErrorAction,
  postChangeScheduleDateSuccessAction,
} from '../slices/changeScheduleDateSlice';
import {Alert} from 'react-native';

// Generator function

function* ChangeScheduleDateSaga(action) {
  console.log(' action ChangeScheduleDateSaga in saga------', action);

  yield put(postChangeScheduleDateAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/ChangeAutoReOrderScheduleDate`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('post change schedule date in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData?.Message);
    }
   
    yield put(postChangeScheduleDateSuccessAction(response));
    yield put(postChangeScheduleDateAction(false));
  } catch (error) {
    console.log('api error', error);


    yield put(postChangeScheduleDateErrorAction(error));
  }
}

// Generator function
export function* watchChangeScheduleDate() {
  yield takeLatest(CHANGE_SCHEDULE_AUTO_DATE, ChangeScheduleDateSaga);
}
