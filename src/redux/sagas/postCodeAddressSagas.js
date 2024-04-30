import {put, select, takeLatest} from 'redux-saga/effects';
import {
  getaddressPostCodeAction,
  getaddressPostCodeErrorAction,
  getaddressPostCodeSuccessAction,
} from '../slices/addressPostCodeSlice';
import {getApiCallwithNew} from '../../utils/ApiHandler';
import {POSTCODE_ADDRESS} from '../types/usersType';

// Generator function

function* postCodeAddressSagas(action) {
  console.log(' action post code address Sagas in saga------', action);

  yield put(getaddressPostCodeAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/FindAddressByPostCode/`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('post code address  success in saga-----', response);
    yield put(getaddressPostCodeSuccessAction(response));
    yield put(getaddressPostCodeAction(false));
  } catch (error) {
    console.log('post address success error', error);

    yield put(getaddressPostCodeErrorAction(error));
  }
}

// Generator function
export function* watchPostCodeAddress() {
  yield takeLatest(POSTCODE_ADDRESS, postCodeAddressSagas);
}
