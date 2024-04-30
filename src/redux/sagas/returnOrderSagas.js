import {put, select, takeLatest} from 'redux-saga/effects';
import {RETURN_ORDER} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  returnRequestAction,
  returnRequestErrorAction,
  returnRequestSuccessAction,
} from '../slices/returnOrderSlice';
import {Alert} from 'react-native';

// Generator function

function* returnOrderSaga(action) {
  console.log(' action return Request in saga------', action);

  yield put(returnRequestAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/ReturnOrder`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('return requset  -----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData?.SuccessMessage);
    }
    yield put(returnRequestSuccessAction(response));
    yield put(returnRequestAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(returnRequestErrorAction(error));
  }
}

// Generator function
export function* watchReturnRequest() {
  yield takeLatest(RETURN_ORDER, returnOrderSaga);
}
