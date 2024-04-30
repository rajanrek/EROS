import {put, select, takeLatest} from 'redux-saga/effects';
import {CANCEL_AUTOREPLENISH} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  postCancelAutoreplenishAction,
  postCancelAutoreplenishErrorAction,
  postCancelAutoreplenishSuccessAction,
} from '../slices/cancelAutoReplenishSlice';
import {Alert} from 'react-native';

// Generator function

function* cancelAutoReplenishSaga(action) {
  console.log(' action auto Replenish in saga------', action);

  yield put(postCancelAutoreplenishAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/CancelAutoReOrder`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('cancel auto -----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData?.Message);
    }
    yield put(postCancelAutoreplenishSuccessAction(response));
    yield put(postCancelAutoreplenishAction(false));
  } catch (error) {
    console.log('api error', error);


    yield put(postCancelAutoreplenishErrorAction(error));
  }
}

// Generator function
export function* watchCancelAutoReplenish() {
  yield takeLatest(CANCEL_AUTOREPLENISH, cancelAutoReplenishSaga);
}
