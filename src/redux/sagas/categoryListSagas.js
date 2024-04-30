import {put, select, takeLatest} from 'redux-saga/effects';
import {GET_CATEGORY_LIST} from '../types/usersType';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {
  getCategoryListAction,
  getCategoryListErrorAction,
  getCategoryListSuccessAction,
} from '../slices/categoryListSlice';

// Generator function

function* getListCategorySagas(action) {
  console.log(' action getListCategorySagas in saga------', action);

  yield put(getCategoryListAction(true));
  const storeState = yield select();
  console.log('action getListCategorySagas in storeState------', storeState);

  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  
  console.log("countryCode in list cate---", countryCode)
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/GetProductTypeForCustomer`,
      json: action.payload,
    });

    console.log('getListCategorySagas---', response);
    yield put(getCategoryListSuccessAction(response));
    yield put(getCategoryListAction(false));
  } catch (error) {
    console.log('api category error', error);

    yield put(getCategoryListErrorAction(error));
  }
}

// Generator function
export function* watchGetListCategory() {
  yield takeLatest(GET_CATEGORY_LIST, getListCategorySagas);
}
