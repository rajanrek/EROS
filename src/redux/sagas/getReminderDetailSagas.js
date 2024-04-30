import {put, select, takeLatest} from 'redux-saga/effects';
import {GET_REMINDER_DETAIL} from '../types/usersType';
import {getApiCallwithNew} from '../../utils/ApiHandler';
import {
  getReminderDetailAction,
  getReminderDetailErrorAction,
  getReminderDetailSuccessAction,
} from '../slices/getReminderDetailSlice';


// Generator function

function* getReminderDetailSagas(action) {
  console.log(' get reminder detail in saga------', action);

  yield put(getReminderDetailAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  try {
    const response = yield getApiCallwithNew({
      url: `${countryCode}/OrderReminderDetails/${action.customerId}`,
    
    });

    // yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('get reminder detail in saga-----', response);
    yield put(getReminderDetailSuccessAction(response));
    yield put(getReminderDetailAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(getReminderDetailErrorAction(error));
  }
}

// Generator function
export function* watchGetReminderDetail() {
  yield takeLatest(GET_REMINDER_DETAIL, getReminderDetailSagas);
}
