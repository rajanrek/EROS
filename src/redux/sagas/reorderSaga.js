import { put, select, takeLatest } from "redux-saga/effects";
import {  GET_CHECKOUT, REORDER_CALL } from "../types/usersType";
import {   getApiCallwithNew} from "../../utils/ApiHandler";
import {   postApiCallWithNewParams } from "../../utils/ApiHandler";
import { getReorderAction, getReorderErrorAction, getReorderSuccessAction } from "../slices/reorderSlice";
import Globals from "../../utils/constant";

// Generator function

function* getReorderSaga(action) {
  console.log(' action getReorderSaga in saga------',action)
    
    yield put(getReorderAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
  try {
const response = yield postApiCallWithNewParams({url:`${countryCode}/Reorder`, json:action.payload})
    
// yield AsyncStorage.setItem('token', JSON.stringify(response));

    console.log('getReorderSaga category in saga-----',response)
    yield Globals.globalBasket=response?.ResultData?.BasketId
    yield put(getReorderSuccessAction(response));
    yield put(getReorderAction(false));

  } catch (error) {
    console.log("api error", error)

    yield put(getReorderErrorAction(error));
  }
}

// Generator function
export function* watchReorder() {
  yield takeLatest(REORDER_CALL, getReorderSaga);
}