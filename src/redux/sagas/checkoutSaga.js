import { put, select, takeLatest } from "redux-saga/effects";
import {  GET_CHECKOUT } from "../types/usersType";
import {   getApiCallwithNew} from "../../utils/ApiHandler";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import { getCheckoutAction, getCheckoutErrorAction, getCheckoutSuccessAction } from "../slices/checkoutSlice";

// Generator function

function* getCheckoutSaga(action) {
  console.log(' action getCheckoutSaga in saga------',action)
    
    yield put(getCheckoutAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/BasketCheckout`, json:action.payload})

// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getCheckoutSaga category in saga-----',response)
    yield put(getCheckoutSuccessAction(response));
    yield put(getCheckoutAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getCheckoutErrorAction(error));
  }
}

// Generator function
export function* watchCheckout() {
  yield takeLatest(GET_CHECKOUT, getCheckoutSaga);
}