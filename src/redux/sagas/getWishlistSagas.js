import { put, select, takeLatest } from "redux-saga/effects";
import {postApiCallWithNewParams } from "../../utils/ApiHandler";
import { getWishlistAction, getWishlistErrorAction, getWishlistSuccessAction } from "../slices/wishlistSlice";
import { GET_WISHLIST } from "../types/usersType";

// Generator function

function* getWishlistSaga(action) {
  console.log('getWishlistSaga action---33--',action)
    
    yield put(getWishlistAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/customerWishlist`, json:action.payload})
    

    console.log('getWishlistSaga success-----',response)
    yield put(getWishlistSuccessAction(response));
    yield put(getWishlistAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getWishlistErrorAction(error));
  }
}

// Generator function
export function* watchGetWishlist() {
  yield takeLatest(GET_WISHLIST, getWishlistSaga);
}