
import { put, select, takeLatest } from "redux-saga/effects";
import {GET_WISHLIST_COUNT} from "../types/usersType";
import {  postApiCallWithNewParams  } from "../../utils/ApiHandler";
import { getWishlistCountAction, getWishlistCountErrorAction, getWishlistCountSuccessAction } from "../slices/wishlistCountSlice";

// Generator function

function* getWishlistCountSagas(action) {
  console.log('get WishlistCount action in saga------',action)
  yield put(getWishlistCountAction(true));
  const storeState = yield select();
  let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
    const response = yield postApiCallWithNewParams({url:`${countryCode}/CustomerWishListCount`, json:action.payload})

    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('get WishlistCount in saga resp-----',response)
    yield put(getWishlistCountSuccessAction(response?.ResultData));
    yield put(getWishlistCountAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getWishlistCountErrorAction(error));
  }
}

// Generator function
export function* watchGetWishlistCount() {
  yield takeLatest(GET_WISHLIST_COUNT, getWishlistCountSagas);
}