import {put, select, takeLatest} from 'redux-saga/effects';
import {POST_REMINDER_DETAIL} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  postReminderDetailAction,
  postReminderDetailErrorAction,
  postReminderDetailSuccessAction,
} from '../slices/postReminderDetailSlice';
import {Alert} from 'react-native';

// Generator function

function* postReminderDetailSaga(action) {
  console.log(' action post reminder in saga------', action);

  yield put(postReminderDetailAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;

  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/OrderReminderDetails/${action.customerId}`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('post reminder  category in saga-----', response);
    if (response?.Errors != null && response?.Errors[0]) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.StatusMessage);
    }
    yield put(postReminderDetailSuccessAction(response));
    yield put(postReminderDetailAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(postReminderDetailErrorAction(error));
  }
}

// Generator function
export function* watchPostReminderDetail() {
  yield takeLatest(POST_REMINDER_DETAIL, postReminderDetailSaga);
}
