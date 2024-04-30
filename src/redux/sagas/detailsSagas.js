import { put, select, takeLatest } from "redux-saga/effects";
import { GET_CATEGORY_LIST, GET_DETAILS_SCREEN} from "../types/usersType";
import {   getApiCallwithNew } from "../../utils/ApiHandler";
import { getDetailsAction, getDetailsErrorAction, getDetailsSuccessAction } from "../slices/DetailsSlice";

// Generator function

function* getDetailsSagas(action) {
  console.log(' action details9-----',action)
    
    yield put(getDetailsAction(true));
    const storeState = yield select();
    let countryCode = storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend ? storeState?.loginuser?.user?.data?.ResultData?.CodeToAppend :storeState?.loginuser?.user?.data?.ResultData?.loginResponse?.CodeToAppend ;
    
  try {
const response = yield getApiCallwithNew({url:`${countryCode}/GetProductDetailAdditionalInfo/`, json:action.payload, CustomerId:action.CustomerId})
    

    console.log('active getDetailsSagas in success-----',response)
    yield put(getDetailsSuccessAction(response));
    yield put(getDetailsAction(false));

  } catch (error) {
    console.log("api getDetailsSagas error", error)

    yield put(getDetailsErrorAction(error));
  }
}

// Generator function
export function* watchGetDetails() {
  yield takeLatest(GET_DETAILS_SCREEN, getDetailsSagas);
}