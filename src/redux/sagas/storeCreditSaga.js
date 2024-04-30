import {put, select, takeLatest} from 'redux-saga/effects';
import {CREDIT_SCORE} from '../types/usersType';
import {getApiCallwithNew} from '../../utils/ApiHandler';
import {
  getCreditScoreDataAction,
  getCreditScoreDataErrorAction,
  getCreditScoreDataSuccessAction,
} from '../slices/creditScoreSlice';

// Generator function

function* getCreditScoreSaga(action) {
  console.log(' action getCreditScoreSaga in saga------', action);

  yield put(getCreditScoreDataAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/CreditStoreDetails/`,
      json: action.payload,
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getCreditScoreSaga category in saga-Success----', response);
    yield put(getCreditScoreDataSuccessAction(response));
    yield put(getCreditScoreDataAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getCreditScoreDataErrorAction(error));
  }
}

// Generator function
export function* watchCreditScore() {
  yield takeLatest(CREDIT_SCORE, getCreditScoreSaga);
}
