import {put, select, takeLatest} from 'redux-saga/effects';
import {CANCEL_ORDER} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  cancelRequestAction,
  cancelRequestErrorAction,
  cancelRequestSuccessAction,
} from '../slices/cancelOrderSlice';
import {Alert} from 'react-native';

// Generator function

function* cancelRequestSaga(action) {
  console.log(' action cancel Request in saga------', action);

  yield put(cancelRequestAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/CancelRefundOrder`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('cancel requset  -----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData?.Message);
    }
    yield put(cancelRequestSuccessAction(response));
    yield put(cancelRequestAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(cancelRequestErrorAction(error));
  }
}

// Generator function
export function* watchCancelRequest() {
  yield takeLatest(CANCEL_ORDER, cancelRequestSaga);
}
