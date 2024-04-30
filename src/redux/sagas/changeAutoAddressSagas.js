import {put, select, takeLatest} from 'redux-saga/effects';
import {CHANGE_AUTO_ADDRESS} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  postChangeAutoAddressAction,
  postChangeAutoAddressErrorAction,
  postChangeAutoAddressSuccessAction,
} from '../slices/changeAutoAddressSlice';
import {Alert} from 'react-native';

// Generator function

function* ChangeAutoAddressSaga(action) {
  console.log(' action change auto date in saga------', action);

  yield put(postChangeAutoAddressAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend
    : storeState?.loginuser?.user?.data?.ResultData?.loginResponse
        ?.CodeToAppend;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/AutoReOrderChangeAddress`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('post change auto address in saga-----', response);
    if (response?.Errors != null && response?.Errors?.length > 0) {
      Alert.alert('Error', response?.Errors[0]);
    } else {
      Alert.alert('Message', response?.ResultData);
    }
   
    yield put(postChangeAutoAddressSuccessAction(response));
    yield put(postChangeAutoAddressAction(false));
  } catch (error) {
    console.log('api error', error);
  
    yield put(postChangeAutoAddressErrorAction(error));
  }
}

// Generator function
export function* watchChangeAutoAddress() {
  yield takeLatest(CHANGE_AUTO_ADDRESS, ChangeAutoAddressSaga);
}
