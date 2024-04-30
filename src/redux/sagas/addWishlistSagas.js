import {put, select, takeLatest} from 'redux-saga/effects';
import {postApiCallWithNewParams} from '../../utils/ApiHandler';
import {ADD_WISHLIST} from '../types/usersType';
import {
  addWishlistAction,
  addWishlistErrorAction,
  addWishlistSuccessAction,
} from '../slices/addWishlistSlice';

// Generator function

function* addWishlistSaga(action) {
  console.log('getWishlistSaga action-----', action);

  yield put(addWishlistAction(true));
  const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend : storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
    const response = yield postApiCallWithNewParams({
      url: `${countryCode}/CustomerWishListAddDelete`,
      json: action.payload,
    });

    console.log('getWishlistSaga success-----', response);
    yield put(addWishlistSuccessAction(response));
    yield put(addWishlistAction(false));
  } catch (error) {
    console.log('api error', error);

    yield put(addWishlistErrorAction(error));
  }
}

// Generator function
export function* watchAddWishlist() {
  yield takeLatest(ADD_WISHLIST, addWishlistSaga);
}
